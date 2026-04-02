const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Welcome Message (Root Route)
router.get('/', (req, res) => {
    // #swagger.summary = 'Welcome message'
    // #swagger.tags = ['General']
    res.send(`Welcome to the Vacations API! Navigate to /api-docs for API documentation.`);
});

// Swagger Documentation Setup
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Your Assigned Collections
router.use('/users', require('./users'));
router.use('/destinations', require('./destinations'));

// Juan (reviews)
// Erin (packages)
// router.use('/reviews', require('./reviews'));
// router.use('/packages', require('./packages'));

module.exports = router;