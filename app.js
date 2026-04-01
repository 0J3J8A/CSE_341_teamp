const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./models/connect'); // reminder to create this file
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000; // Are we using 3000 or 8080?

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    // Allows your team to test from different origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    next();
  })
  // Setup Swagger Documentation Route
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  // Setup Main Routes
  .use('/', require('./routes'))
  // Global Error Handler (Required for Rubric)
  .use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      message: 'Internal Server Error',
      error: err.message
    });
  });

// Need to connect to erin's mongodb for shared env
mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed: ', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});