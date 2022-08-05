import {createSlice} from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: null,
        loginStatus: false,
    },
    reducers: {
        login: (state,action) => {
            state.currentUser = action.payload;
            state.loginStatus = true;
        },
        logOut: (state) => {
            state.loginStatus = false;
            state.currentUser = null;
        },
    }
}) 

export const { login, logOut } = LoginSlice.actions;
export default LoginSlice.reducer;