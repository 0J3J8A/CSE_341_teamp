// models/Review.js
const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Destination name is required'],
        trim: true,
        maxlength: [200, 'Destination name cannot exceed 200 characters']
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        maxlength: [200, 'Country name cannot exceed 200 characters']
    },
    lengthOfStay: {
        type: Number,
        required: [true, 'Length of stay is required'],
        min: [1, 'Length of stay must be at least 1 day']
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required'],
        min: [1, 'Cost must be at least 1']
    }
});

module.exports = mongoose.model('Destination', destinationSchema);