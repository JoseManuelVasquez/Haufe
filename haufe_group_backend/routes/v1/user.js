var express = require('express');
var user = require('../../controllers/v1/user');
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

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', authorization, user.logout);

module.exports = router;