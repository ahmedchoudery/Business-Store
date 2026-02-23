require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Security middleware
app.use(helmet());

// CORS — allow Vercel frontend + localhost dev
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://business-store.vercel.app',
    'https://business-store-six.vercel.app',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, etc.)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            // Allow any vercel.app subdomain
            if (origin && origin.endsWith('.vercel.app')) {
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

// API Router
const apiRouter = express.Router();

// Health check inside apiRouter
apiRouter.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Business Store API is running 🚀' });
});

// Routes inside apiRouter
apiRouter.use('/contact', require('./routes/contact'));

// Mount apiRouter to both /api and / to handle Vercel routing variations
app.use('/api', apiRouter);
app.use('/', apiRouter);

// 404 handler (moved to after mounting the router)
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

module.exports = app;
