import { configureStore } from '@reduxjs/toolkit'
import characterReducer from "./slices/characterSlice";
import userReducer from "./slices/userSlice";

// Redux Toolkit simplifies to have reducers and actions folders
export default configureStore({
    reducer: {
        character: characterReducer,
        user: userReducer
    }
})