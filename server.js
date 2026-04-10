// server.js
// Main application entry point

require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongodb = require('./database/connect');

// Import routes
const reviewRoutes = require('./routes/reviews');
const packageRoutes = require('./routes/packages');
const userRoutes = require('./routes/users');
const destinationRoutes = require('./routes/destinations');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

// CORS setup - works for localhost and Render
const allowedOrigins = [
    'http://localhost:3000',
    process.env.CLIENT_URL || 'https://cse-341-team-app.onrender.com'
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true
}));

// Trust proxy for Render
app.set('trust proxy', isProduction ? 1 : 0);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'change-this-in-production',
    resave: false,
    saveUninitialized: false,
    store: mongodb.getSessionStore(),
    cookie: {
        secure: isProduction,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: isProduction ? 'none' : 'lax'
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', require('./routes'));           // Welcome route
app.use('/auth', authRoutes);                // Auth routes
app.use('/packages', packageRoutes);         // Packages collection
app.use('/reviews', reviewRoutes);           // Reviews collection
app.use('/users', userRoutes);               // Users collection
app.use('/destinations', destinationRoutes); // Destinations collection

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

// DB connection + server start
mongodb.initDb((err) => {
    if (err) {
        console.error('Database initialization error:', err);
    } else {
        console.log("Connected to MongoDB");
        if (process.env.NODE_ENV !== "test") {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
    }
});

module.exports = app;