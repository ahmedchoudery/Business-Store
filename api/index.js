module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Hello from the BARE MINIMUM Node.js function! 🚀');
};
