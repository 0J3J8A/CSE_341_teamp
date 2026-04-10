const User = require('../models/users');

// Get all users
const getAllUsers = async (req, res) => {
    // #swagger.summary = 'Get all users'
    // #swagger.description = 'Endpoint to retrieve all users.'
    // #swagger.tags = ['Users']
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users'
        });
    }
};

// Get single user by id
const getUserById = async (req, res) => {
    // #swagger.summary = 'Get user by ID'
    // #swagger.tags = ['Users']
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid User ID format'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new user
const createUser = async (req, res) => {
    // #swagger.summary = 'Create a new user'
    // #swagger.tags = ['Users']
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
            $firstName: 'Glenn',
            $lastName: 'User',
            $email: 'glenn@example.com',
            $favoriteColor: 'Blue',
            $birthday: '1995-01-01'
        }
    } */
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating user'
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    // #swagger.summary = 'Update a user'
    // #swagger.tags = ['Users']
    /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data',
    required: true,
    schema: {
        $firstName: 'Glenn',
        $lastName: 'User',
        $email: 'glenn@example.com',
        $favoriteColor: 'Blue',
        $birthday: '1995-01-01'
    }
} */
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user'
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    // #swagger.summary = 'Delete a user'
    // #swagger.tags = ['Users']
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user'
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};