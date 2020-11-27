import {createSlice} from '@reduxjs/toolkit';

export const token = createSlice({
    name: 'token',
    initialState: {
        tokenEmail: '',
        tokenSignIn: '',
    },
    reducers: {
        setTokenEmail: (state, action) => {
            return {
                ...state,
                tokenEmail: action.payload
            }
        },
        meFromTokenSuccess: (state, action) => {
            return {
                ...state,
                tokenEmail: '',
                tokenSignIn: action.payload,
            }
        },
        meFromTokenFailure: (state, action) => {
            return {
                ...state,
                tokenEmail: '',
                tokenSignIn: '',
            }
        }
    }
});

export const {setTokenEmail, meFromTokenFailure, meFromTokenSuccess} = token.actions;

export default token.reducer;

