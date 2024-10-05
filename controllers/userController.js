const userModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs
const jwt = require('jsonwebtoken'); // For JWT (bonus)
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// Mock secret for JWT
const SECRET_KEY = "mysecretkey";

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

    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        try{
            const newUser = {
                id: uuidv4(),
                username: username,
                passwordHash: hash,
                email: email
            };
    
            userModel.addUser(newUser);
            res.status(201).json({ message: "User registered successfully" });
        }
        catch(err){
            res.status(202).json({ message: "Failed to hash password. Please retry registering." });
        }
    });

    // Login
    exports.login = (req, res) => {
        const { email, password } = req.body;
        const user = userModel.findUserByEmail(email);
    
        if (!email) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        bcrypt.compare(password, user.passwordHash, function(err, result) {
            // result == true
        });
    
        // Mock Token (or JWT if going for bonus)
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    
        res.json({ token });
    };
};