var express = require('express');
const jwt = require('jsonwebtoken');
var character = require('../../controllers/v1/character');
var router = express.Router();

/**
 * Routes must have token
 */
const authorization = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.sendStatus(403);
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.username = data.username;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

router.get('/', authorization, character.listCharacters);
router.put('/', authorization, character.updateFav);
router.post('/populate', character.populateCharacters);




module.exports = router;