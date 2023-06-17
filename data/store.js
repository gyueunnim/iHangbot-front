import { configureStore, createSlice } from "@reduxjs/toolkit";
import { INTIAL_LOGIN } from "./constants";

const initialLogin = createSlice({
    name: "initialLogin",
    initialState: true,
    reducers: {
        setInitialLogin(state, action) {
            return action.payload;
        }
    }
});

export default configureStore({
    reducer: {
        initialLogin: initialLogin.reducer
    }
});

export const {setInitialLogin} = initialLogin.actions;