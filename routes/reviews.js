// routes/reviews.js
const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    getReviewById,
    findByReview,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');
const { isAuthenticated, optionalAuth } = require('../middleware/authMiddleware');

// /api/reviews
router.route('/')
    .get(optionalAuth, getAllReviews)      // Public
    .post(isAuthenticated, createReview);   // Login Required

// /api/reviews/findByReview
router.get('/findByReview', optionalAuth, findByReview);  // Public

// /api/reviews/:id
router.route('/:id')
    .get(optionalAuth, getReviewById)      // Public
    .put(isAuthenticated, updateReview)     // Login Required
    .delete(isAuthenticated, deleteReview); // Login Required

module.exports = router;