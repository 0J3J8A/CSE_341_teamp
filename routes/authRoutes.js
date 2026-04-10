// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start Google login
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/auth/login-failed',
        successRedirect: '/auth/success'
    })
);

// Check if user is authenticated
router.get('/status', (req, res) => {
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
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Success page
router.get('/success', (req, res) => {
    res.json({
        message: 'Login successful',
        user: req.user
    });
});

// Login failed
router.get('/login-failed', (req, res) => {
    res.status(401).json({
        message: 'Login failed'
    });
});

module.exports = router;