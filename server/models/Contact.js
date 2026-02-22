const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [/^[0-9+\s\-()]{7,15}$/, 'Please enter a valid phone number'],
        },
        service: {
            type: String,
            required: [true, 'Please select a service'],
            enum: [
                'landing-page',
                'business-website',
                'react-website',
                'responsive-design',
                'speed-optimization',
                'css-fixes',
                'other',
            ],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            maxlength: [1000, 'Message cannot exceed 1000 characters'],
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'converted', 'closed'],
            default: 'new',
        },
        source: {
            type: String,
            default: 'website',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Contact', contactSchema);
