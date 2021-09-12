import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import characterAPI from "../api/characterAPI";

export const listCharacters = createAsyncThunk(
    'character/listCharacters',
    async (page, thunkAPI) => {
        try {
            const response = await characterAPI.listCharacters(page);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const updateFav = createAsyncThunk(
    'character/updateFav',
    async ({characterName, fav}, thunkAPI) => {
        try {
            const response = await characterAPI.updateFav(characterName, fav);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const characterSlice = createSlice({
    name: 'character',
    initialState: {
        characters: [],
        currentPage: 1
    },
    reducers: {
        // Immutable changes since it uses the Immer library
        increasePage: (state, action) => {
            state.currentPage += 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listCharacters.fulfilled, (state, action) => {
            state.characters = [...state.characters, ...action.payload.result];
        });

        builder.addCase(updateFav.fulfilled, (state, action) => {
        });
    },
});

// Actions
export const { increasePage } = characterSlice.actions;

export default characterSlice.reducer