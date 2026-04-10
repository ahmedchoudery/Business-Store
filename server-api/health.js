module.exports = (req, res) => {
    res.status(200).json({
        status: 'diagnostic-minimal-ok',
        timestamp: new Date().toISOString(),
        env_keys: Object.keys(process.env).filter(k => k.includes('MONGO'))
    });
};
