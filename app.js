const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');  // Import logging middleware
const limiter = require('./middleware/limiterMiddleware');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;



app.use(limiter);

// Middleware
app.use(bodyParser.json());

app.use(loggingMiddleware);  // Use the logging middleware for all routes

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
