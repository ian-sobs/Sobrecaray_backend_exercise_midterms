const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    // Get the Authorization header from the request
    const authHeader = req.headers['authorization'];

    // Check if the header exists and extract the token
    const token = authHeader && authHeader.split(' ')[1];  // Extract the Bearer token
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
