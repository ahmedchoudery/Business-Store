const { body, validationResult } = require('express-validator');

/**
 * contactValidationRules — express-validator chain for the contact form.
 * FIX: added isLength({ min: 2 }) to name — previously a single character passed.
 */
const contactValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address')
        .normalizeEmail(),  // lowercase + strip dots for Gmail etc.

    body('phone')
        .trim()
        .notEmpty().withMessage('Phone is required')
        .matches(/^[0-9+\s\-()]{7,15}$/).withMessage('Enter a valid phone number (7–15 digits)'),

    body('service')
        .notEmpty().withMessage('Please select a service')
        .isIn([
            'bug-fixes',
            'responsive-design',
            'landing-pages',
            'small-business',
            'portfolio',
            'other',
        ]).withMessage('Invalid service selected'),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
        .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),
];

/**
 * validate — middleware that checks for validation errors from express-validator.
 * Returns 422 with a structured errors array if any rules failed.
 */
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
