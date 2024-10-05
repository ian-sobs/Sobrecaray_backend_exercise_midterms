const userModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs
const jwt = require('jsonwebtoken'); // For JWT (bonus)

// Mock secret for JWT
const SECRET_KEY = "mysecretkey";

// Registration
exports.register = (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = userModel.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }


  const newUser = {
    id: uuidv4(),
    username,
    password,
    email
  };

  userModel.addUser(newUser);
  res.status(201).json({ message: "User registered successfully" });
};