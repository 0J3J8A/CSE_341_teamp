const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/packageController');
const authMiddleware = require('../middleware/auth');


// Standard CRUD
router.get('/', PackageController.getAllPackages);
router.post('/', authMiddleware, PackageController.createPackage);

// Custom route: filter by type (before /:id to avoid conflicts)
router.get('/findByType', PackageController.findByType);

router.get('/:id', PackageController.getPackageById);
router.put('/:id',authMiddleware, PackageController.updatePackage);
router.delete('/:id', authMiddleware, PackageController.deletePackage);

module.exports = router;