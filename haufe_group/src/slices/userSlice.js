import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from '../api/userAPI'

export const login = createAsyncThunk(
    'user/login',
    async ({username, password}, thunkAPI) => {
        try {
            const response = await userAPI.login(username, password);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async ({username, password}, thunkAPI) => {
        try {
            const response = await userAPI.register(username, password);
            return response.data
        } catch (e) {
            console.error(e);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        isLogged: false
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserLogged: (state, action) => {
            state.isLogged = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLogged = action.payload;
        });

        builder.addCase(register.fulfilled, (state, action) => {
        });
    },
});

// Actions
export const { setUsername, setUserLogged } = userSlice.actions;

export default userSlice.reducer