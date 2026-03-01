/**
 * scrollToSection — smooth-scrolls to an anchor element with a fixed
 * navbar offset so the section heading isn't hidden under the sticky nav.
 *
 * @param {string} href   - CSS selector / anchor, e.g. '#contact'
 * @param {number} offset - Pixels to subtract from the top (default: 80)
 */
export function scrollToSection(href, offset = 80) {
    const el = document.querySelector(href);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}
