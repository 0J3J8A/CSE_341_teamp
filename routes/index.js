const router = require('express').Router();

// 1. The Welcome Route (The "Home Page")
router.get('/', (req, res) => {
    // #swagger.summary = 'Welcome message'
    // #swagger.description = 'Endpoint to return a welcome message.'
    // #swagger.tags = ['General']
    res.send(`Welcome to the Vacations API! Navigate to /api-docs for API documentation.`);
});

module.exports = router;