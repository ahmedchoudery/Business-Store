const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { contactValidationRules, validate } = require('../logic/validate');

const router = express.Router();

const requireDb = async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        const connectDB = require('../config/db');
        try {
            await connectDB();
        } catch (err) {
            console.error('[DB_ERROR] requireDb failed to connect:', err.message);
            return res.status(503).json({
                success: false,
                message: 'Database connection failed. Please try again shortly.',
                debug: process.env.NODE_ENV !== 'production' ? { error: err.message } : undefined,
            });
        }
    }
    next();
};

/**
 * @route   POST /api/contact
 * @desc    Submit a contact/lead form
 * @access  Public
 */
router.post('/', contactValidationRules, validate, requireDb, async (req, res) => {
    try {
        const { name, email, phone, business, message, budget } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            business: business || '',
            message,
            budget: budget || '',
        });

        res.status(201).json({
            success: true,
            message: "Thanks for reaching out! I'll get back to you within 24 hours. 🎉",
            data: {
                id: contact._id,
                name: contact.name,
                createdAt: contact.createdAt,
            },
        });
    } catch (error) {
        console.error('[API_ERROR] Contact submission failed:', error);

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

/**
 * @route   GET /api/contact
 * @desc    Retrieve all contact submissions (Admin only)
 * @access  Private (Requires x-admin-secret header)
 */
router.get('/', requireDb, async (req, res) => {
    const secret = req.headers['x-admin-secret'];
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        console.error('[API_ERROR] Failed to fetch contacts:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;