const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
