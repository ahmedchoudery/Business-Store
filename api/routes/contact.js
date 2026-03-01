const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { contactValidationRules, validate } = require('../middleware/validate');

const router = express.Router();

/**
 * Database readiness middleware for serverless/cold starts
 */
const requireDb = async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        const connectDB = require('../config/db');
        try {
            await connectDB();
        } catch (err) {
            return res.status(503).json({
                success: false,
                message: 'Database connection failed. Please try again.',
                debug: process.env.NODE_ENV !== 'production' ? { error: err.message } : undefined,
            });
        }
    }
    next();
};

// ─── POST /api/contact ────────────────────────────────────────────────────────
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

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map((val) => val.message).join(', '),
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});

// ─── GET /api/contact ─────────────────────────────────────────────────────────
router.get('/', requireDb, async (req, res) => {
    const secret = req.headers['x-admin-secret'];
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
