const router = require('express').Router();

// 1. The Welcome Route (The "Home Page")
router.get('/', (req, res) => {
    // #swagger.summary = 'Welcome message'
    // #swagger.description = 'Endpoint to return a welcome message.'
    // #swagger.tags = ['General']
    res.send(`Welcome to the Vacations API! Navigate to /api-docs for API documentation.`);
});

// 2. Import all the individual route files
const users = require('./users');
const destinations = require('./destination'); 
const packages = require('./package');
const reviews = require('./review');

// 3. Assign the paths
router.use('/users', users);             // Glenn's part
router.use('/destinations', destinations); // Erin's part
router.use('/packages', packages);       // Allison's part? Please confirm
router.use('/reviews', reviews);         // Juan's part

module.exports = router;