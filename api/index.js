require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

/**
 * ─── Vercel Diagnostic Logging ──────────────────────────────────────────────
 * This will help us see EXACTLY what path Express is receiving.
 */
app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url} | Path: ${req.path}`);
    next();
});

// ─── DB Connection ────────────────────────────────────────────────────────────
connectDB().catch((err) => {
    console.error('Initial DB connection failed:', err.message);
});

// ─── Security Middleware ──────────────────────────────────────────────────────
// Relax helmet for now to ensure it doesn't block frontend assets via CSP
app.use(helmet({
    contentSecurityPolicy: false,
}));

const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://business-store.vercel.app',
    'https://business-store-six.vercel.app',
    'https://business-store-ahmedchoudery.vercel.app',
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.vercel.app')) {
                return callback(null, true);
            }
            callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'x-admin-secret'],
        credentials: true,
    })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// ─── BULLETPROOF ROUTING ──────────────────────────────────────────────────────
const contactRouter = require('./routes/contact');

// We mount at BOTH root and /api prefixes. 
// This covers cases where Vercel rewrites to /api/index.js 
// AND cases where Express sees the /api prefix.
const mainRouter = express.Router();
mainRouter.use('/contact', contactRouter);

app.use('/api', mainRouter);
app.use('/', mainRouter);

// Health check
app.get(['/api/health', '/health', '/api'], (req, res) => {
    res.json({
        status: 'ok',
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        has_uri: !!process.env.MONGO_URI,
        url: req.url,
        path: req.path,
    });
});

// ─── 404 Catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => {
    console.error(`ABSENT_ROUTE: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: 'Route not found in Express. Verify you are hitting /api/contact',
        debug: {
            method: req.method,
            url: req.url,
            path: req.path,
            originalUrl: req.originalUrl
        },
    });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('SERVER_ERROR:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        debug: process.env.NODE_ENV !== 'production' ? { name: err.name, message: err.message } : undefined
    });
});

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Local server running on port ${PORT}`));
}

module.exports = app;
