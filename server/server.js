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
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommarce';
mongoose.connect(MONGO_URI)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err))

// middleware
app.use(express.json({ limit: '54mb' }));
app.use(express.urlencoded({ limit: '54mb', extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "https:", "'unsafe-inline'"],
            fontSrc: ["'self'", "https:", "data:"],
        }
    }
}));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//  uploads folder static serve — routes 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// rate limit
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 500 });

app.use('/api/v1/Login', authLimiter);
app.use('/api/v1/Registration', authLimiter);
app.use('/api/v1', apiLimiter);

// routes
app.use('/api/v1', router);

// static frontend
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// server
const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;