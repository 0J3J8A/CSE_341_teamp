const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./database/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000;

// Import routes
const reviewRoutes = require('./routes/reviews');
const packageRoutes = require('./routes/packages');
const userRoutes = require('./routes/users');
const destinationRoutes = require('./routes/destinations');

app.use(bodyParser.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'] }));
app.use(cors({ origin: '*' }));

// Routes
app.use('/', require('./routes'));          // Welcome route
app.use('/packages', packageRoutes);        // Packages collection
app.use('/reviews', reviewRoutes);          // Reviews collection
app.use('/users', userRoutes);              // Users collection
app.use('/destinations', destinationRoutes);// Destinations collection

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: 'Internal Server Error',
        error: err.message
    });
});

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection + server start
mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`);
        });
    }
});
