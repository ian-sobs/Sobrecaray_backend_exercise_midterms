const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');  // Import logging middleware
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
  });

app.use(limiter);

// Middleware
app.use(bodyParser.json());

app.use(loggingMiddleware);  // Use the logging middleware for all routes

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
