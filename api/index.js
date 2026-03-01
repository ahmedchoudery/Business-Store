require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectDB = require('../backend/config/db');

const app = express();

/**
 * ─── Core Backend Logic (Vercel Entry Point) ──────────────────────────────────
 * 
 * Vercel uses this file directly as a serverless function.
 * All logic is imported from the /backend folder to avoid Vercel 
 * misidentifying subfolders as individual functions.
 */

// ─── DB Connection ────────────────────────────────────────────────────────────
// Initial connect attempt. Cold starts are handled lazily by requireDb middleware.
connectDB().catch((err) => {
    console.error('[STARTUP] Initial DB connection failed:', err.message);
});

// ─── Middleware ─────────────────────────────────────────────────────────────
// Security headers - Relaxed CSP to allow React frontend to run without blocks.
app.use(helmet({
    contentSecurityPolicy: false,
}));

// CORS Configuration
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
            // Allow: no-origin (local dev tools), whitelisted origins, or any Vercel preview domain
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

// ─── Main API Routes ──────────────────────────────────────────────────────────
const contactRouter = require('../backend/routes/contact');

const mainRouter = express.Router();
mainRouter.use('/contact', contactRouter);

// API logic mounted strictly under /api
app.use('/api', mainRouter);

// Health check — Used for monitoring and Vercel warmups
app.get(['/api/health', '/health', '/api'], (req, res) => {
    res.json({
        status: 'ok',
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        has_uri: !!process.env.MONGO_URI,
    });
});

// Environment diagnostic (Admin Only)
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

// ─── Error Handling ───────────────────────────────────────────────────────────

// 404 Catch-all
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found. Verify you are hitting /api/contact.',
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[SERVER_ERROR]', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        debug: process.env.NODE_ENV !== 'production' ? { name: err.name, message: err.message } : undefined
    });
});

/**
 * Startup Logic
 * Only starts listening if the file is run directly (local dev bypassing server/index.js).
 */
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 API backend logic running on port ${PORT}`));
}

module.exports = app;
