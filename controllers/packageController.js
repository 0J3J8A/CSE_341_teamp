const Package = require('../models/package');

// Get all packages
const getAllPackages = async (req, res) => {
  // #swagger.summary = 'Get all packages'
  // #swagger.description = 'Endpoint to retrieve all vacation packages.'
  // #swagger.tags = ['Packages']
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new package
const createPackage = async (req, res) => {
  // #swagger.summary = 'Create a new package'
  // #swagger.description = 'Endpoint to create a new vacation package.'
  // #swagger.tags = ['Packages']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Package data',
      required: true,
      schema: {
          $name: 'any',
          $type: 'any',
          $destination: 'any'
      }
  } */
  try {
    const pkg = new Package(req.body);
     console.log("Incoming body:", req.body);
    const saved = await pkg.save();
     console.log("Saved package:", saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get package by ID
const getPackageById = async (req, res) => {
  // #swagger.summary = 'Get package by ID'
  // #swagger.description = 'Endpoint to retrieve a single vacation package by its ID.'
  // #swagger.tags = ['Packages']
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update package
const updatePackage = async (req, res) => {
  // #swagger.summary = 'Update a package'
  // #swagger.description = 'Endpoint to update an existing vacation package by its ID.'
  // #swagger.tags = ['Packages']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Package data',
      required: true,
      schema: {
          $name: 'any',
          $type: 'any',
          $destination: 'any'
      }
  } */
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete package
const deletePackage = async (req, res) => {
  // #swagger.summary = 'Delete a package'
  // #swagger.description = 'Endpoint to delete an existing vacation package by its ID.'
  // #swagger.tags = ['Packages']
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Custom filter by type
const findByType = async (req, res) => {
  // #swagger.summary = 'Find packages by type'
  // #swagger.description = 'Endpoint to find vacation packages by their type. Use query parameter "type" to specify the package type (e.g., "beach", "adventure").'
  // #swagger.tags = ['Packages']
  /* #swagger.parameters['type'] = {
      in: 'query',
      description: 'Type of the package',
      required: true,
      type: 'string'
  } */
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({ message: 'Query parameter "type" is required' });
    }

    const packages = await Package.find({ type });
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPackages,
  createPackage,
  getPackageById,
  updatePackage,
  deletePackage,
  findByType
};
