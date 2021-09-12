const { MongoClient } = require('mongodb');
const { createUserSchema, User } = require('../models/user');
const { createCharacterSchema, Character } = require('../models/character');

const mongoDbMiddleware = (req, res, next) => {
    MongoClient.connect(process.env.DB_URI)
        .catch((err) => {
            console.error(err.stack);
            process.exit(1);
        })
        .then(async (client) => {
            await createUserSchema(client);
            await createCharacterSchema(client);
            await User.injectDB(client);
            await Character.injectDB(client);
            next();
        });
};

module.exports = {
    mongoDbMiddleware
};