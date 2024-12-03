const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { firstName, lastName, email, password, batch, year } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    let role = "student";
    if (email === "admin@bmu.edu.in") {
      role = "admin";
    } else if (/^[a-zA-Z]+\.[a-zA-Z]+@bmu\.edu\.in$/.test(email)) {
      role = "faculty";
    } else if (/^.+\.(\d{2})([a-zA-Z]+)@bmu\.edu\.in$/.test(email)) {
      // Additional validation for student emails
    } else {
      return res.status(400).json({ status: false, message: "Invalid email format" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      batch,
      year,
      role,
    });

    await user.save();
    return res.status(201).json({ status: true, message: "Signup successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, SECRET_KEY, { expiresIn: "7h" });

    res.cookie("Token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 3600000),
      sameSite: "lax",
    });

    console.log("Generated token: ", token);
    return res.status(200).json({ status: true, message: "Login successful", user: existingUser, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies?.split("; ").find((cookie) => cookie.startsWith("Token="))?.split("=")[1];

  if (!token) {
    return res.status(404).json({ status: false, message: "No token found" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    req.id = user.id;
    next();
  });
};

const getUser = async (req, res) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies?.split("; ").find((cookie) => cookie.startsWith("Token="))?.split("=")[1];

  if (!prevToken) {
    return res.status(400).json({ message: "No token found" });
  }

  jwt.verify(prevToken, SECRET_KEY, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Authentication failed" });
    }

    res.clearCookie("Token", { path: "/" });
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "7h" });

    res.cookie("Token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 3600000),
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

const logout = (req, res) => {
  res.clearCookie("Token", { path: "/" });
  return res.status(200).json({ message: "Successfully Logged Out" });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.logout = logout;
