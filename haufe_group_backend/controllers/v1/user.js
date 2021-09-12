const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            return await res.status(400).send({
                error: "Username or Password missing",
            });
        }

        const result = await User.register(username, password);

        return res.json({
            success: true
        });
    } catch (errorMessage) {
        return res.status(501).send({
            error: errorMessage
        });
    }
};

const login = async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            return res.status(400).send({
                error: "Username or Password missing",
            });
        }

        const result = await User.login(username, password);

        if (result.error) {
            return res.status(400).send({
                error: result.message,
            });
        }

        const token = jwt.sign({ username: username }, process.env.JWT_SECRET);

        return res
            .cookie("access_token", token, {httpOnly: true, secure: process.env.NODE_ENV === "production"})
            .json({success: true});
    } catch (errorMessage) {
        return res.status(501).send({
            error: errorMessage
        });
    }
};

const logout = async (req, res, next) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({success: true});
};

module.exports = {
    register,
    login,
    logout
};