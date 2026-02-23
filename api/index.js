const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// SUPER EARLY PING (Test if Express even loads)
app.get('/api/ping', (req, res) => res.send('pong 🏓'));

// --- ISOLATED TEST ROUTES ---
app.get(['/api/health', '/health', '/api'], (req, res) => {
    res.json({
        status: 'isolated_test',
        mongo: 'disabled',
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

// 3. Contact Submission (DISABLED FOR ISOLATION)
/*
const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);
app.use('/contact', contactRouter);
*/

// --- CATCH-ALL 404 ---
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
            advice: 'If hitting /api/contact fails, try /contact directly.'
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
// On Vercel, we only export the app. For local dev, we use this conditional listener:
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Local server running on port ${PORT}`);
    });
}

module.exports = app;
