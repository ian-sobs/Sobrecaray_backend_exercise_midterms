const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');  // Import logging middleware
const rateLimit = require("express-rate-limit");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
  });


app.use(limiter);

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(loggingMiddleware);  // Use the logging middleware for all routes

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
