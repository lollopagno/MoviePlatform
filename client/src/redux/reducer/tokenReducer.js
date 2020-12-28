import {createSlice} from '@reduxjs/toolkit';

/**
 * Token reducer
 */
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
        meFromTokenSuccess: (state, action) => {
            return {
                ...state,
                email: undefined,
                signIn: action.payload,
            }
        },
        meFromTokenFailure: (state) => {
            return {
                ...state,
                email: undefined,
                signIn: undefined,
            }
        },
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

