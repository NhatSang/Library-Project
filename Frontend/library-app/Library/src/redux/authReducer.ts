import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        userId: '',
        user: {},
        accessToken: '',
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.accessToken = action.payload;
        },
        clearAuth: state => {
            state.accessToken = '';
        },
        clearUser: state => {
            state.user = {};
        },
        clearUserId: state => {
            state.userId = '';
        },
    },
});

export const {
    setUser,
    setAuth,
    clearAuth,
    clearUser,
    setUserId,
    clearUserId,
} = authReducer.actions;
export default authReducer.reducer;
