/**
 * scrollTo.js — Smooth scroll utility
 *
 * TYPESCRIPT SKILL: Even in .js files, JSDoc type annotations serve as
 * lightweight type documentation and enable IDE intellisense without
 * requiring a full TypeScript migration.
 */

/**
 * Smoothly scrolls to a section matching the given CSS selector.
 *
 * @param {string} selector - A valid CSS selector, e.g. '#contact' or '.hero'
 * @returns {void}
 *
 * @example
 * scrollToSection('#contact')
 */
export function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}