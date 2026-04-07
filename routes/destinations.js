const router = require('express').Router();
const DestinationController = require('../controllers/destinationController');

router.get('/', DestinationController.getAllDestinations);
router.get('/:id', DestinationController.getDestinationById);
router.get('/findByCostRange', DestinationController.findByCostRange);
router.post('/', DestinationController.createDestination);
router.put('/:id', DestinationController.updateDestination);
router.delete('/:id', DestinationController.deleteDestination);

module.exports = router;