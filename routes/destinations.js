const router = require('express').Router();
const DestinationController = require('../controllers/destinationController');
const { isAuthenticated, optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, DestinationController.getAllDestinations);
router.get('/findByCostRange', optionalAuth, DestinationController.findByCostRange);
router.get('/:id', optionalAuth, DestinationController.getDestinationById);
router.post('/', isAuthenticated, DestinationController.createDestination);
router.put('/:id', isAuthenticated, DestinationController.updateDestination);
router.delete('/:id', isAuthenticated, DestinationController.deleteDestination);

module.exports = router;