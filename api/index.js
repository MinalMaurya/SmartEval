const app = require('../server');

module.exports = (req, res) => {
    // Ensure Express router correctly matches original path if rewritten by Vercel
    if (req.originalUrl && req.url !== req.originalUrl) {
        req.url = req.originalUrl;
    }
    return app(req, res);
};
