const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Import the authentication middleware Juan created
const { isAuthenticated } = require('../middleware/authMiddleware');

// Public Routes 
// Anyone can view users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Protected Routes (OAuth) 
// Per the rubric: "Secure at least two collections' POST and PUT endpoints"
// We add isAuthenticated as the second argument to protect these routes
router.post('/', isAuthenticated, userController.createUser); 
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;