const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/packageController');
 
// Standard CRUD
router.get('/', PackageController.getAllPackages);
router.post('/', PackageController.createPackage);
router.get('/:id', PackageController.getPackageById);
router.put('/:id', PackageController.updatePackage);
router.delete('/:id', PackageController.deletePackage);
 
// Custom route: filter by type
router.get('/findByType', PackageController.findByType);
 
module.exports = router;