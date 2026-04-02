const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Vacation APIs',
        description: 'APIs for managing vacations'
    },
    host: 'https://cse-341-team-app.onrender.com/',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
