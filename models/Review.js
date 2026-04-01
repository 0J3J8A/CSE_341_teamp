// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: [true, 'Destination name is required'],
        trim: true,
        maxlength: [200, 'Destination name cannot exceed 200 characters']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        trim: true,
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    author: {
        type: String,
        default: 'Anonymous',
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);