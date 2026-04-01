const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Import individual route files
routes.use('/users', require('./users'));
routes.use('/destinations', require('./destinations'));
// Juan (reviews)
// Erin (packages)
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = routes;