const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.set('trust proxy', 1);

const router = require('./routes/api');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Middleware
app.use(express.json({ limit: '54mb' }));
app.use(express.urlencoded({ limit: '54mb', extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limit
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 500 });

app.use('/api/v1/Login', authLimiter);
app.use('/api/v1/Registration', authLimiter);
app.use('/api/v1', apiLimiter);

// Routes
app.use('/api/v1', router);

// Server
const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;