const swaggerAutogen = require('swagger-autogen')();

const isLocal = process.env.NODE_ENV !== 'production'; // default to local unless explicitly set to production

const doc = {
    info: {
        title: 'Vacation Planning API',
        description: 'Team 06 Project: Destinations, Reviews, Packages, and User Management.'
    },
    host: isLocal ? 'localhost:3000' : 'cse-341-team-app.onrender.com',
    schemes: isLocal ? ['http'] : ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
