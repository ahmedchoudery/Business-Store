module.exports = (req, res) => {
    res.status(200).json({
        message: "Hello from minimal Vercel function!",
        node_version: process.version,
        env_keys: Object.keys(process.env).filter(k => !k.includes('SECRET'))
    });
};
