const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;  // Replace with your secret key

const authMiddleware = (req, res, next) => {
    // const token = req.headers.authorization?.split(' ')[1];  // Extract token from headers
    const token = req.cookies?.Token;
    if (!token) {
        return res.status(401).json({ status: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded token:",decoded);
        req.user = decoded;  // Add user data to request
        next();
    } catch (err) {
        return res.status(401).json({ status: false, message: "Invalid token" });
    }
};

module.exports = authMiddleware;