import axios from "axios";

const LOGIN_ENDPOINT = "http://localhost:3001/user/login";
const SIGNUP_ENDPOINT = "http://localhost:3001/user/register";
const LOGOUT_ENDPOINT = "http://localhost:3001/user/logout";

const userAPI = () => {};

userAPI.login = async (username, password) => {
    try {
        return await axios.post(LOGIN_ENDPOINT, {
            username: username,
            password: password
        }, {withCredentials: true});
    } catch (e) {
        throw e;
    }
};

userAPI.register = async (username, password) => {
    try {
        return await axios.post(SIGNUP_ENDPOINT, {
            username: username,
            password: password
        });
    } catch (e) {
        throw e;
    }
};

userAPI.logout = async () => {
    try {
        return await axios.post(LOGOUT_ENDPOINT, {withCredentials: true});
    } catch (e) {
        throw e;
    }
};

export default userAPI
