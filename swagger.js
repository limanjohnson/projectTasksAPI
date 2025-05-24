const swaggerAutogen = require('swagger-autogen')();

const doc = {
    swagger: '2.0',
    info: {
        title: 'Projects API',
        description: 'Create Swagger Documentation',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc);
