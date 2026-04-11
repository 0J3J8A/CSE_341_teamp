// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start Google login
router.get('/google',
    // #swagger.summary = 'Google Login'
    // #swagger.description = 'Endpoint to initiate Google OAuth login.'
    // #swagger.tags = ['Auth']
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get('/google/callback',
    // #swagger.summary = 'Google Callback'
    // #swagger.description = 'Endpoint for Google OAuth callback.'
    // #swagger.tags = ['Auth']
    passport.authenticate('google', { 
        failureRedirect: '/auth/login-failed',
        successRedirect: '/auth/success'
    })
);

// Check if user is authenticated
router.get('/status',
    // #swagger.summary = 'Check Authentication Status'
    // #swagger.description = 'Endpoint to check if the user is authenticated.'
    // #swagger.tags = ['Auth']
    (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        });
    } else {
        res.json({
            authenticated: false,
            user: null
        });
    }
});

// Logout
router.get('/logout',
    // #swagger.summary = 'Logout'
    // #swagger.description = 'Endpoint to log out the authenticated user.'
    // #swagger.tags = ['Auth']
    (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Success page
router.get('/success',
    // #swagger.summary = 'Login Success'
    // #swagger.description = 'Endpoint returned after successful login.'
    // #swagger.tags = ['Auth']
    (req, res) => {
    res.json({
        message: 'Login successful',
        user: req.user
    });
});

// Login failed
router.get('/login-failed', (req, res) => {
    // #swagger.summary = 'Login Failed'
    // #swagger.description = 'Endpoint returned when login fails.'
    // #swagger.tags = ['Auth']
    res.status(401).json({
        message: 'Login failed'
    });
});

module.exports = router;