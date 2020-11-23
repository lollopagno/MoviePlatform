import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
        email: '',
        username: '',
        name: '',
        _id: '',
        tokenEmail: '',
        tokenSignIn: ''
    },
    reducers: {
        signUpSuccess: (state, action) => {
            const {email, username, _id, name} = action.payload.user
            return {
                ...state,
                tokenEmail: action.payload.token,
                name : name,
                email: email,
                username: username,
                _id: _id
            }
        },
        signInSuccess: (state, action) => {
            return {
                ...state,
                tokenEmail: '',
                tokenSignIn: action.payload.token
            }
        },
        changeTokenEmail: (state, action) => {
            return {
                ...state,
                tokenEmail: action.payload.token
            }
        },
        meFromTokenSuccess: (state, action) => {
            state.user = action.payload.user;
            state.tokenSignIn = action.payload.token;
        },
        meFromTokenFailure: (state, action) => {
            state.error = action.payload;
            state.tokenSignIn = '';
        }
    }
});

export const {signUpSuccess, signInSuccess, changeTokenEmail, meFromTokenFailure, meFromTokenSuccess} = user.actions;

export default user.reducer;





