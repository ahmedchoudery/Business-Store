const express = require('express');
const mongoose = require('mongoose'); // FIX: moved from inline require() inside request handler
const Contact = require('../models/Contact');
const { contactValidationRules, validate } = require('../middleware/validate');

const router = express.Router();

// ─── Middleware ───────────────────────────────────────────────────────────────

/**
 * requireDb — ensures the database is connected before processing requests.
 * FIX: extracted from inline check inside the route handler to a reusable middleware.
 */
const requireDb = (req, res, next) => {
    if (!process.env.MONGO_URI || mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: 'Database not ready. Please try again shortly.',
            debug: process.env.NODE_ENV !== 'production'
                ? { has_uri: !!process.env.MONGO_URI, db_state: mongoose.connection.readyState }
                : undefined,
        });
    }
    next();
};

// ─── POST /api/contact ────────────────────────────────────────────────────────
// @desc  Submit a contact/lead form
// @access Public
router.post('/', contactValidationRules, validate, requireDb, async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        const contact = await Contact.create({ name, email, phone, service, message });

        res.status(201).json({
            success: true,
            message: "Thanks for reaching out! I'll get back to you within 24 hours.",
            data: {
                id: contact._id,
                name: contact.name,
                createdAt: contact.createdAt,
            },
        });
    } catch (error) {
        console.error('Contact submit error:', error);

        // Surface Mongoose validation errors with a clean message
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors)
                    .map((val) => val.message)
                    .join(', '),
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});

// ─── GET /api/contact ─────────────────────────────────────────────────────────
// @desc  Retrieve all contact submissions
// @access Private (requires x-admin-secret header)
router.get('/', requireDb, async (req, res) => {
    const secret = req.headers['x-admin-secret'];
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        console.error('Fetch contacts error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
