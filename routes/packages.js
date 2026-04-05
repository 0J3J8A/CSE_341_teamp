const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/packageController');

// Standard CRUD
router.get('/', PackageController.getAllPackages);
router.post('/', PackageController.createPackage);

// Custom route: filter by type (before /:id to avoid conflicts)
router.get('/findByType', PackageController.findByType);

router.get('/:id', PackageController.getPackageById);
router.put('/:id', PackageController.updatePackage);
router.delete('/:id', PackageController.deletePackage);

module.exports = router;