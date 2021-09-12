var bcrypt = require('bcrypt');
const USER_COLLECTION = "users";
const SALT_WORK_FACTOR = 10;

/**
 * User Schema
 * @param connection
 * @returns {Promise<void>}
 */
const createUserSchema = async (connection) => {
    const db = connection.db(process.env.DB_NAME);
    const collection = await db.listCollections({name: USER_COLLECTION}).toArray();

    if (collection.length > 0) {
        return;
    }

    await db.createCollection(USER_COLLECTION, {
        capped: false,
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "username", "password"],
                title: USER_COLLECTION,
                additionalProperties: false,
                properties: {
                    _id: {
                        bsonType: "objectId",
                    },
                    username: {
                        bsonType: "string",
                    },
                    password: {
                        bsonType: "string",
                    }
                },
            },
        },
        validationLevel: "strict",
        validationAction: "error",
    });

    await db
        .collection(USER_COLLECTION)
        .createIndex({ username: 1 }, { unique: true });
};

/**
 * User model
 */
let User = () => {};

User.injectDB = async (connection) => {
    try {
        if(!User.users) User.users = await connection.db(process.env.DB_NAME).collection(USER_COLLECTION);
    } catch (e) {
        console.error(`Unable to use collection users: ${e}`);
        connection.close();
    }
};

User.register = async (username, password) => {
    try {
        // Hashing a password before saving it to the database
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(password, salt);

        // create a document to insert
        const doc = {
            username: username,
            password: hash,
        };

        const result = await User.users.insertOne(doc);
        return "Successfully registered";

    } catch (e) {
        throw "Error while registering user";
    }
};

User.login = async (username, password) => {
    try {
        const result = await User.users.findOne({username: username});
        const correctPassword = await bcrypt.compare(password, result.password);
        if (!result) {
            return {
                error: true,
                message: "Username doesn't exists"
            };
        }
        if (!correctPassword){
            return {
                error: true,
                message: "Incorrect password"
            };
        }

        return {
            success: true,
            message: "Successfully logged in"
        };

    } catch (e) {
        throw "Error while login user";
    }
};

module.exports = {
    createUserSchema,
    User
};