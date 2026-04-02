const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

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

module.exports = { initDb, getDb };
