require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

// Security middleware
app.use(helmet());

// CORS — allow Vercel frontend + localhost dev
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://business-store.vercel.app',
    'https://business-store-six.vercel.app',
    'https://business-store-ahmedchoudery.vercel.app'
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
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

// --- ROUTES ---

// 1. Health & Resilience Diagnostic
app.get(['/api/health', '/health', '/api'], async (req, res) => {
    // Attempt lazy connection if not connected
    if (mongoose.connection.readyState === 0 && process.env.MONGO_URI) {
        connectDB().catch(() => { });
    }

    res.json({
        status: 'ok',
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        has_uri: !!process.env.MONGO_URI,
        url_received: req.originalUrl,
        path: req.path
    });
});

// 2. Environment Diagnostic
app.get(['/api/debug-env', '/debug-env'], (req, res) => {
    res.json({
        has_mongo_uri: !!process.env.MONGO_URI,
        node_env: process.env.NODE_ENV,
        keys: Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('URL') || k.includes('SECRET'))
    });
});

// 3. Contact Submission (Standard & Safety variations)
const contactRouter = require('./routes/contact');
app.use(['/api/contact', '/contact', '/api/api/contact'], contactRouter);

// --- CATCH-ALL 404 ---
app.use((req, res) => {
    console.error(`ABSENT_ROUTE: ${req.method} ${req.url} (Original: ${req.originalUrl})`);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        diagnostics: {
            method: req.method,
            path: req.path,
            url: req.url,
            originalUrl: req.originalUrl,
            advice: 'Standard route is /api/contact. If using /api prefix twice, it will still work now.'
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

// --- SERVER INITIALIZATION ---
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Local server running on port ${PORT}`));
}

module.exports = app;
