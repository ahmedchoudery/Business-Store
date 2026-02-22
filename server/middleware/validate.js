const { body, validationResult } = require('express-validator');

const contactValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name too long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address'),

    body('phone')
        .trim()
        .notEmpty().withMessage('Phone is required')
        .matches(/^[0-9+\s\-()]{7,15}$/).withMessage('Enter a valid phone number'),

    body('service')
        .notEmpty().withMessage('Please select a service')
        .isIn([
            'landing-page',
            'business-website',
            'react-website',
            'responsive-design',
            'speed-optimization',
            'css-fixes',
            'other',
        ]).withMessage('Invalid service selected'),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ max: 1000 }).withMessage('Message too long (max 1000 chars)'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
    }
    next();
};

module.exports = { contactValidationRules, validate };
