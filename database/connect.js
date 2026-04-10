// database/connect.js
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const initDb = async (callback) => {
    if (mongoose.connection.readyState === 1) {
        console.log('Db is already initialized!');
        return callback(null, mongoose.connection);
    }
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            callback(null, mongoose.connection);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (mongoose.connection.readyState !== 1) {
        throw Error('Db has not been initialized.');
    }
    return mongoose.connection;
};

// Store sesions function
const getSessionStore = () => {
    return MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60 // 14 days
    });
};

module.exports = { initDb, getDb, getSessionStore };