module.exports = (req, res) => {
    res.json({
        status: 'minimal-diag-ok',
        env_keys: Object.keys(process.env).filter(k => k.includes('MONGO'))
    });
};
