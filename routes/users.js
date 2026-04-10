const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// IMPORTANT: Confirm the name of the OAuth middleware with Erin or the team


// Public Routes 
// Anyone can view users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Protected Routes (OAuth) 
// Per the rubric: "Secure at least two collections' POST and PUT endpoints"


router.post('/', userController.createUser); 
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;