// middleware/authMiddleware.js
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in first.'
    });
};

const optionalAuth = (req, res, next) => {
    // This middleware doesn't block unauthenticated users
    next();
};

module.exports = { isAuthenticated, optionalAuth };