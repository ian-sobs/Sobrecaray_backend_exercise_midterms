const express = require('express');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');  // Import logging middleware
const {limiter} = require("./middleware/rateLimitMiddleware");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;


app.use(limiter);

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(loggingMiddleware);  // Use the logging middleware for all routes

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
