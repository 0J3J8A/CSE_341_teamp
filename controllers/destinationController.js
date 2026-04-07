const Destination = require('../models/destination');

// Get all destinations
const getAllDestinations = async (req, res) => {
    // #swagger.summary = 'Get all destinations'
    // #swagger.description = 'Endpoint to retrieve all destinations.'
    // #swagger.tags = ['Destinations']
    try {
        const destinations = await Destination.find().sort({ createdAt: -1 });

        res.status(200).json({destinations});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching destinations'
        });
    }
};

// Get single destination by id
const getDestinationById = async (req, res) => {
    // #swagger.summary = 'Get destination by ID'
    // #swagger.description = 'Endpoint to retrieve a single destination by its ID.'
    // #swagger.tags = ['Destinations']
    try {
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: `Destination not found with id ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: destination
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid destination ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching the destination'
        });
    }
};

// Find destinations by cost range
const findByCostRange = async (req, res) => {
    // #swagger.summary = 'Search destinations by cost range'
    // #swagger.description = 'Endpoint to search for destinations based on cost range. Use query parameters "min" and "max" to specify the range.'
    // #swagger.tags = ['Destinations']
    /* #swagger.parameters['min'] = {
        in: 'query',
        description: 'Minimum cost',
        required: true,
        type: 'number'
    }
    /* #swagger.parameters['max'] = {
        in: 'query',
        description: 'Maximum cost',
        required: true,
        type: 'number'
    } */
    try {
        const min = parseFloat(req.query.min);
        const max = parseFloat(req.query.max);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cost range'
            });
        }

        const destinations = await Destination.find({
            cost: { $gte: min, $lte: max }
        });

        res.status(200).json({
            success: true,
            count: destinations.length,
            data: destinations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while searching destinations'
        });
    }
};

// Create new destination
const createDestination = async (req, res) => {
    // #swagger.summary = 'Create a new destination'
    // #swagger.description = 'Endpoint to create a new destination.'
    // #swagger.tags = ['Destinations']
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Destination data',
        required: true,
        schema: {
            $name: 'any',
            $country: 'any',
            $lengthOfStay: 5,
            $cost: 1000
        }
    } */
    try {
        const destination = await Destination.create(req.body);

        res.status(201).json({
            success: true,
            data: destination
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while creating the destination'
        });
    }
};

// Update destination
const updateDestination = async (req, res) => {
    // #swagger.summary = 'Update a destination'
    // #swagger.description = 'Endpoint to update an existing destination by its ID.'
    // #swagger.tags = ['Destinations']
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Destination data',
        required: true,
        schema: {
            $name: 'any',
            $country: 'any',
            $lengthOfStay: 5,
            $cost: 1000
        }
    } */
    try {
        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: `Destination not found with id ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: destination
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid destination ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating the destination'
        });
    }
};

// Delete destination
const deleteDestination = async (req, res) => {
    // #swagger.summary = 'Delete a destination'
    // #swagger.description = 'Endpoint to delete an existing destination by its ID.'
    // #swagger.tags = ['Destinations']
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: `Destination not found with id ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Destination deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid destination ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while deleting the destination'
        });
    }
};

module.exports = {
    getAllDestinations,
    getDestinationById,
    findByCostRange,
    createDestination,
    updateDestination,
    deleteDestination
};