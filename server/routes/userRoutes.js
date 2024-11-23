const express = require('express');
const router = express.Router();
const User = require('../modal/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register

const secretekey = "bmlmunjaluniversityproject4edulink";

router.post('/signup', async (req, res) => {
    try {
        const {profilePic, firstName, lastName, email, password, batch, year} = req.body;

        if(!profilePic, !firstName, !lastName, !email, !password, !batch, !year) {
            return res.status(400).json({status: false, message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({status: false, message: "User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            profilePic,
            firstName,
            lastName,
            email,
            password: hashPassword,
            batch,
            year
        }); 
        await newUser.save();

        return res.status(201).json({status: true, message: "Register successful"});
    }catch (error) {
        return res.status(400).json({status: false, message: "something went wrong", error: error.message});
    }
});
// Login

router.post('/login', async (req, res) => {
    try {
        const { email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({status: false, message: "All fields are required"});
        }

        const user = await User.findOne({email});
        
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({status: false, message: "Invalid credentials"});
        }

        const token = jwt.sign({id:user._id, email:user.email}, secretekey, {expiresIn: "1hr"});

        return res.status(201).json({status: true, message: "Login successful", token: token });
    }catch (error) {
        return res.status(400).json({status: false, message: "something went wrong", error: error.message});
    }
});


// Profile

router.post('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            return res.status(400).json({status: false, message: "Access denied"});
        }

        jwt.verify(token, secretekey, async (err, decode) => {
            const user = await User.findById(decode?.id)
            if(!user) {
                return res.status(400).json({status: false, message: "Invalid token"});
            }
            const userData = {
                profilePic: user?.profilePic,
                id: user?.id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email,
                batch: user?.batch,
                year: user?.year
            }
            return res.status(201).json({status: true, message: "Profile data", data: userData });
        });
    
    }catch (error) {
        return res.status(400).json({status: false, message: "something went wrong", error: error.message});
    }
});







module.exports = router;