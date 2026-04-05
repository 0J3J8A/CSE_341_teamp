const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Vacation Planning API',
        description: 'Team 06 Project: Destinations, Reviews, Packages, and User Management.'
    },
    host: 'cse-341-team-app.onrender.com',
    // Update swagger.json to use "host": "localhost:3000" for local testing, switch back to "host": "cse-341-team-app.onrender.com" when pushing to main
    schemes: ['https', 'http']
    // Update swagger.json to use "schemes": ["http"] for local testing, switch back to "schemes": ["https"] when pushing to main
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
