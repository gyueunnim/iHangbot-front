import { configureStore, createSlice } from "@reduxjs/toolkit";
import { INTIAL_LOGIN } from "./constants";

const loginMode = createSlice({
    name: "loginMode",
    initialState: INTIAL_LOGIN,
    reducers: {
        setLoginMode(state, action) {
            return action.payload;
        }
    }
});

export default configureStore({
    reducer: {
        loginMode: loginMode.reducer
    }
});

export const {setLoginMode} = loginMode.actions;