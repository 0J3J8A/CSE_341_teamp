const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Vacation APIs',
        description: 'APIs for managing vacations'
    },
    host: 'https://cse-341-team-app.onrender.com/',
    // Update swagger.json to use "host": "localhost:3000" for local testing, switch back to "host": "cse-341-team-app.onrender.com" when pushing to main
    schemes: ['https']
    // Update swagger.json to use "schemes": ["http"] for local testing, switch back to "schemes": ["https"] when pushing to main
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
