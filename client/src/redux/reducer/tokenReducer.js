import {createSlice} from '@reduxjs/toolkit';

export const token = createSlice({
    name: 'token',
    initialState: {
        email: undefined,
        signIn: undefined,
    },
    reducers: {
        setTokenEmail: (state, action) => {
            return {
                ...state,
                email: action.payload
            }
        },
        // SignIn
        meFromTokenSuccess: (state, action) => {
            return {
                ...state,
                email: undefined,
                signIn: action.payload,
            }
        },
        // SignIn error
        meFromTokenFailure: (state) => {
            return {
                ...state,
                email: undefined,
                signIn: undefined,
            }
        },
        // Sign out
        deleteToken: (state) => {
            return {
                ...state,
                signIn: undefined
            }
        }
    }
});

export const {setTokenEmail, meFromTokenFailure, meFromTokenSuccess, deleteToken} = token.actions;

export default token.reducer;

