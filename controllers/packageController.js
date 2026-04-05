const Package = require('../models/package');

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new package
const createPackage = async (req, res) => {
  try {
    const pkg = new Package(req.body);
    const saved = await pkg.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get package by ID
const getPackageById = async (req, res) => {
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
  try {
    const { type } = req.query;
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
