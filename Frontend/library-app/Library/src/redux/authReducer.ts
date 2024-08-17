import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        accessToken: '',
    },
    reducers: {
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
    },
});

export const { setUser, setAuth, clearAuth, clearUser } = authReducer.actions;
export default authReducer.reducer;
