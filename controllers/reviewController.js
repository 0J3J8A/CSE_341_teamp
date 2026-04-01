// controllers/reviewController.js
const Review = require('../models/Review');

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        console.error('Error in getAllReviews:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching reviews'
        });
    }
};

// Get single review by id
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: `Review not found with id ${req.params.id}`
            });
        }
        
        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        console.error('Error in getReviewById:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid review ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while fetching the review'
        });
    }
};

// Find reviews by comment content
const findByReview = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: 'Search query parameter "q" is required'
            });
        }
        
        const reviews = await Review.find({
            comment: { $regex: searchTerm, $options: 'i' }
        });
        
        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        console.error('Error in findByReview:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while searching reviews'
        });
    }
};

// Create new review
const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        
        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        console.error('Error in createReview:', error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while creating the review'
        });
    }
};

// Update review
const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: `Review not found with id ${req.params.id}`
            });
        }
        
        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        console.error('Error in updateReview:', error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid review ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while updating the review'
        });
    }
};

// Delete review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: `Review not found with id ${req.params.id}`
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
            data: {}
        });
    } catch (error) {
        console.error('Error in deleteReview:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid review ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while deleting the review'
        });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    findByReview,
    createReview,
    updateReview,
    deleteReview
};