// controllers/reviewController.js
const Review = require('../models/Review');

// Get all reviews
const getAllReviews = async (req, res) => {
    // #swagger.summary = 'Get all reviews'
    // #swagger.description = 'Endpoint to retrieve all reviews.'
    // #swagger.tags = ['Reviews']
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
    // #swagger.summary = 'Get review by ID'
    // #swagger.description = 'Endpoint to retrieve a single review by its ID.'
    // #swagger.tags = ['Reviews']
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
    // #swagger.summary = 'Search reviews by comment content'
    // #swagger.description = 'Endpoint to search for reviews based on comment content. Use query parameter "q" to specify the search term.'
    // #swagger.tags = ['Reviews']
    // #swagger.parameters['q'] = {
    //     in: 'query',
    //     description: 'Search term to match against review comments',
    //     required: true,
    //     type: 'string'
    // }
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
    // #swagger.summary = 'Create a new review'
    // #swagger.description = 'Endpoint to create a new review.'
    // #swagger.tags = ['Reviews']
    // #swagger.parameters['body'] = {
    //     in: 'body',
    //     description: 'Review data',
    //     required: true,
    //     schema: {
    //         $destination: 'any',
    //         $rating: 5,
    //         $comment: 'This is a great destination!'
    //     }
    // }
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
    // #swagger.summary = 'Update a review'
    // #swagger.description = 'Endpoint to update an existing review by its ID.'
    // #swagger.tags = ['Reviews']
    // #swagger.parameters['body'] = {
    //     in: 'body',
    //     description: 'Review data',
    //     required: true,
    //     schema: {
    //         $destination: 'any',
    //         $rating: 5,
    //         $comment: 'This is a great destination!'
    //     }
    // }
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
    // #swagger.summary = 'Delete a review'
    // #swagger.description = 'Endpoint to delete an existing review by its ID.'
    // #swagger.tags = ['Reviews']
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