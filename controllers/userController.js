const userModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs
const jwt = require('jsonwebtoken'); // For JWT (bonus)
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// Mock secret for JWT
const SECRET_KEY = process.env.SECRET_KEY;

// Registration
exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = userModel.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = {
        id: uuidv4(),
        username: username,
        passwordHash: hashedPassword,
        email: email
    };

    userModel.addUser(newUser);
    res.status(201).json({ message: "User registered successfully" });
};

    // Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = userModel.findUserByEmail(email);
    
    if (!email) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
        
    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login

        // Mock Token (or JWT if going for bonus)
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        
        res.json({ token });
    }
    else {
        return res.status(400).json({ message: "Invalid credentials" });
    }
};

// Profile (Protected Route)
exports.getProfile = (req, res) => {
    const user = userModel.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.json({ id: user.id, username: user.username, email: user.email });
};