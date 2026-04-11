// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: [true, 'Google ID is required'],
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Prevents duplicate accounts with the same email
        lowercase: true, // Normalizes email to lowercase
        trim: true // Removes accidental spaces
    },
    name: {
        type: String,
        required: [true, 'Display name is required'],
        trim: true
    },
    // Adding these to reach the 7-field requirement for Week 7 early:
    profilePicture: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Restricts input to these two options
        default: 'user'
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);