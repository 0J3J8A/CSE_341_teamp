const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./models/connect'); // Using your models folder
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
// Render usually uses 8080, but 3000 is fine for local. This covers both:
const port = process.env.PORT || 8080; 

app
  .use(cors()) // Simplified CORS to allow everything for the team
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  // 1. Swagger Documentation
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  
  // 2. Main Routes (This usually handles /reviews, /users, etc. internally)
  .use('/', require('./routes'))

  // 3. Global Error Handler (Fulfills the Week 05 Rubric)
  .use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      message: 'Internal Server Error',
      error: err.message
    });
  });

// 4. Initialize Database and Start Server
mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed: ', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});