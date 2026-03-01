require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

// ─── DB Connection ────────────────────────────────────────────────────────────
connectDB().catch((err) => {
    console.error('Initial DB connection failed:', err.message);
});

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────
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

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check — reports DB connectivity
app.get(['/api/health', '/health', '/api'], (req, res) => {
    res.json({
        status: 'ok',
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        has_uri: !!process.env.MONGO_URI,
        url_received: req.originalUrl,
        path: req.path,
    });
});

// Environment diagnostic — PROTECTED: requires admin secret header
// FIX: previously exposed env key names to the public internet (security risk)
app.get(['/api/debug-env', '/debug-env'], (req, res) => {
    const secret = req.headers['x-admin-secret'];
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    res.json({
        has_mongo_uri: !!process.env.MONGO_URI,
        node_env: process.env.NODE_ENV,
        keys: Object.keys(process.env).filter(
            (k) => k.includes('MONGO') || k.includes('URL') || k.includes('SECRET')
        ),
    });
});

// Contact form
const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);
app.use('/contact', contactRouter);

// ─── 404 Catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => {
    console.error(`ABSENT_ROUTE: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        diagnostics: {
            method: req.method,
            originalUrl: req.originalUrl,
            url: req.url,
            path: req.path,
            advice: 'If hitting /api/contact fails, try /contact directly.',
        },
    });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// FIX: debug block only sent in non-production to prevent internal detail leaks
app.use((err, req, res, next) => {
    console.error('SERVER_ERROR:', err);
    const response = {
        success: false,
        message: err.message || 'Internal Server Error',
    };
    if (process.env.NODE_ENV !== 'production') {
        response.debug = { name: err.name, message: err.message };
    }
    res.status(err.status || 500).json(response);
});

// ─── Server Startup ───────────────────────────────────────────────────────────
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Local server running on port ${PORT}`);
    });
}

module.exports = app;
