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
                tokenSignIn: action.payload
            }
        },
        changeTokenEmail: (state, action) => {
            return {
                ...state,
                tokenEmail: action.payload.token
            }
        },
        meFromTokenSuccess: (state, action) => {
            state.user = action.payload;
        },
        meFromTokenFailure: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {signUpSuccess, signInSuccess, changeTokenEmail, meFromTokenFailure, meFromTokenSuccess} = user.actions;

export default user.reducer;





