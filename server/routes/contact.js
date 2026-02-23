const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { contactValidationRules, validate } = require('../middleware/validate');

// @route   POST /api/contact
// @desc    Submit a contact/lead form
// @access  Public
router.post('/', contactValidationRules, validate, async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        const contact = new Contact({
            name,
            email,
            phone,
            service,
            message,
        });

        await contact.save();

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

        // Handle Mongoose validation errors specifically
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map(val => val.message).join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            debug: {
                name: error.name,
                message: error.message
            }
        });
    }
});

// @route   GET /api/contact
// @desc    Get all contacts (admin only — protected by secret header)
// @access  Private (x-admin-secret header)
router.get('/', async (req, res) => {
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
