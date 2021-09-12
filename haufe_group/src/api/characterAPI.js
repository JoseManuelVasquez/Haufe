import axios from "axios";

const LIST_CHARACTERS_ENDPOINT = "http://localhost:3001/character";
const UPDATE_FAV_ENDPOINT = "http://localhost:3001/character";

const characterAPI = () => {};

characterAPI.listCharacters = async (currentPage) => {
    try {
        return await axios.get(LIST_CHARACTERS_ENDPOINT + `?page=${currentPage}`, {withCredentials: true});
    } catch (e) {
        throw e;
    }
};

characterAPI.updateFav = async (characterName, fav) => {
    try {
        let data = JSON.stringify({
            characterName: characterName,
            fav: fav
        });

        return await axios.put(UPDATE_FAV_ENDPOINT, data, {withCredentials: true});
    } catch (e) {
        throw e;
    }
};

export default characterAPI
