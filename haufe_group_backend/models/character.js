const CHARACTER_COLLECTION = "characters";

/**
 * Character Schema
 * @param connection
 * @returns {Promise<void>}
 */
const createCharacterSchema = async (connection) => {
    const db = connection.db(process.env.DB_NAME);
    const collection = await db.listCollections({name: CHARACTER_COLLECTION}).toArray();

    if (collection.length > 0) {
        return;
    }

    await db.createCollection(CHARACTER_COLLECTION, {
        capped: false,
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "name", "location", "firstSeen", "fav", "avatar"],
                title: CHARACTER_COLLECTION,
                additionalProperties: false,
                properties: {
                    _id: {
                        bsonType: "objectId",
                    },
                    name: {
                        bsonType: "string",
                    },
                    location: {
                        bsonType: "string",
                    },
                    firstSeen: {
                        bsonType: "string",
                    },
                    fav: {
                        bsonType: "bool",
                    },
                    avatar: {
                        bsonType: "string",
                    }
                },
            },
        }
    });
};

/**
 * User model
 */
let Character = () => {};

Character.injectDB = async (connection) => {
    try {
        if(!Character.characters) Character.characters = await connection
                                                                .db(process.env.DB_NAME)
                                                                .collection(CHARACTER_COLLECTION);
    } catch (e) {
        console.error(`Unable to use collection characters: ${e}`);
        connection.close();
    }
};

Character.insertCharacters = async (characters) => {
    try {
        await Character.characters.insertMany(characters);
        return "success";

    } catch (e) {
        throw "Error while insert characters";
    }
};

Character.listCharacters = async (page, pageSize) => {
    try {
        return await Character.characters
                                .find({})
                                .project({_id: 0})
                                .limit(pageSize)
                                .skip((page-1)*pageSize)
                                .toArray();

    } catch (e) {
        throw "Error while listing characters";
    }
};

Character.updateFav = async (characterName, fav) => {
    try {
        await Character.characters
                        .updateOne({name: characterName}, { $set: { fav : fav }});

    } catch (e) {
        throw "Error while updating character";
    }
};

module.exports = {
    createCharacterSchema,
    Character
};