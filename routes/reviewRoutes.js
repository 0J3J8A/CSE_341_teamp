// routes/reviewRoutes.js
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

// /api/reviews
router.route('/')
    .get(getAllReviews)
    .post(createReview);

// /api/reviews/findByReview
router.get('/findByReview', findByReview);

// /api/reviews/:id
router.route('/:id')
    .get(getReviewById)
    .put(updateReview)
    .delete(deleteReview);
    
module.exports = router;