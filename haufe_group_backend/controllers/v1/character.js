const axios = require('axios');
const { Cache }  = require( '../../services/cache' );
const { Character } = require('../../models/character');

const populateCharacters = async (req, res, next) => {
    try {
        const cache = Cache.getInstance();

        const result = await axios.get('https://rickandmortyapi.com/api/character');
        let charactersData = [];
        for (let character of result.data.results) {
            // If episode name is not in cache
            let episodeName = cache.get(character.episode[0]);
            if (!episodeName) {
                const characterData = await axios.get(character.episode[0]);  // Get episode name
                cache.set(character.episode[0], characterData.data.name); // cache this episode name
                episodeName = characterData.data.name;
            }

            charactersData.push({
                name: character.name,
                location: character.location.name,
                firstSeen: episodeName,
                fav: false,
                avatar: character.image
            });
        }

        // Next pages
        for (let i=2; i <= result.data.info.pages; i++) {
            const result = await axios.get(`https://rickandmortyapi.com/api/character?page=${i}`);
            for (let character of result.data.results) {
                // If episode name is not in cache
                let episodeName = cache.get(character.episode[0]);
                if (!episodeName) {
                    const characterData = await axios.get(character.episode[0]);  // Get episode name
                    cache.set(character.episode[0], characterData.data.name); // cache this episode name
                    episodeName = characterData.data.name;
                }

                charactersData.push({
                    name: character.name,
                    location: character.location.name,
                    firstSeen: episodeName,
                    fav: false,
                    avatar: character.image
                });
            }
        }
        await Character.insertCharacters(charactersData);

        return res.json({
            success: true
        });
    } catch (errorMessage) {
        res.status(501).send({
            error: errorMessage
        });
    }

};

const listCharacters = async (req, res, next) => {
    try {
        let page = req.query.page;
        let pageSize = req.query.pageSize;

        page = page ? page : 1; // By default page 1 if none
        pageSize = pageSize >= 0 ? pageSize :  10; // By default 10 if none

        const result = await Character.listCharacters(page, pageSize);

        return res.json({
            success: true,
            result: result
        });
    } catch (errorMessage) {
        res.status(501).send({
            error: errorMessage
        });
    }
};

const updateFav = async (req, res, next) => {
    try {
        let characterName = req.body.characterName;
        let fav = req.body.fav;

        await Character.updateFav(characterName, fav);

        return res.json({
            success: true
        });
    } catch (errorMessage) {
        res.status(501).send({
            error: errorMessage
        });
    }
};

module.exports = {
    listCharacters,
    populateCharacters,
    updateFav
};