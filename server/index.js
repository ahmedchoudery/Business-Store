/**
 * Local Development Proxy Entry Point
 * 
 * To fulfill the requirement of Clean Architecture and avoid duplication,
 * this file simply bridges the local development environment to the 
 * production-ready backend logic located in the /api folder.
 * 
 * Vercel uses /api/index.js directly. Local dev uses this file.
 */

const app = require('../api/index');
const PORT = process.env.PORT || 5001;

// Only start the listener if this file is run directly (local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Local dev server running on http://localhost:${PORT}`);
        console.log(`📡 API endpoints mapped to /api/*`);
    });
}

module.exports = app;
