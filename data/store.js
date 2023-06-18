import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialLogin = createSlice({
    name: "initialLogin",
    initialState: true,
    reducers: {
        setInitialLogin(state, action) {
            return action.payload;
        }
    }
});

const userLoginInfo = createSlice({
    name: "userLoginInfo",
    initialState: { id: "" }, 
    reducers: {
        setUserLoginInfo(state, action) {
            state.id = action.payload[0]
        }
    }
})

export default configureStore({
    reducer: {
        initialLogin: initialLogin.reducer,
        userLoginInfo: userLoginInfo.reducer
    }
});

export const {setInitialLogin} = initialLogin.actions;
export const {setUserLoginInfo} = userLoginInfo.actions;