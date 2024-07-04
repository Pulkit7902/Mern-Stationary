const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/conn');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const app = express();

// Connect to the database

// CORS configuration
const allowedOrigins = [process.env.ADMIN_URL, process.env.FRONTEND_URL];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

// Root route handler

connectDB()
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
