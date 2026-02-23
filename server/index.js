require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const mongoose = require('mongoose'); // Moved mongoose import to the top

const app = express();

// Connect Database (Non-blocking but with logging)
connectDB().catch(err => {
    console.error('Initial DB Connection failed:', err.message);
});

// Security middleware
app.use(helmet());

// CORS — allow Vercel frontend + localhost dev
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://business-store.vercel.app',
    'https://business-store-six.vercel.app',
    'https://business-store-ahmedchoudery.vercel.app' // Common Vercel pattern
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, etc.)
            // Allow listed origins or any vercel.app subdomain
            if (!origin || allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
                callback(null, true);
                return;
            }
            callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'x-admin-secret'],
        credentials: true,
    })
);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// --- REUSABLE ROUTER FOR PREFIX AGNOSTICISM ---
const mainRouter = express.Router();

// Health Check
mainRouter.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        has_uri: !!process.env.MONGO_URI,
        time: new Date().toISOString()
    });
});

// Debug ENV (Sensitive but safe)
mainRouter.get('/debug-env', (req, res) => {
    res.json({
        has_mongo_uri: !!process.env.MONGO_URI,
        node_env: process.env.NODE_ENV,
        keys: Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('AUTH') || k.includes('SECRET'))
    });
});

// Contact Routes
mainRouter.use('/contact', require('./routes/contact'));

// --- MOUNTING ---
app.use('/api', mainRouter);
app.use('/', mainRouter);

// 404 handler with consistent diagnostic keys
app.use((req, res) => {
    console.error(`404: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        diagnostics: {
            method: req.method,
            originalUrl: req.originalUrl,
            url: req.url,
            path: req.path
        }
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('SERVER_ERROR:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        debug: {
            name: err.name,
            message: err.message
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

module.exports = app;
