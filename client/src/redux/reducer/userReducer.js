import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
        email: '',
        username: '',
        name: '',
        _id: '',
        tokenEmail: '',
        tokenSignIn: '',
        error: ''
    },
    reducers: {
        signUpSuccess: (state, action) => {
            const {email, username, _id, name} = action.payload.data
            return {
                ...state,
                tokenEmail: action.payload.token,
                name : name,
                email: email,
                username: username,
                _id: _id,
                error: ''
            }
        },
        signInSuccess: (state, action) => {
            return {
                ...state,
                tokenEmail: '',
                tokenSignIn: action.payload.token,
                error: ''
            }
        },
        changeTokenEmail: (state, action) => {
            return {
                ...state,
                tokenEmail: action.payload.token
            }
        },
        meFromTokenSuccess: (state, action) => {
            const {email, username, _id, name} = action.payload.data
            return {
                ...state,
                tokenEmail: '',
                tokenSignIn: action.payload.token,
                name : name,
                email: email,
                username: username,
                _id: _id,
                error: ''
            }
        },
        meFromTokenFailure: (state, action) => {
            return {
                ...state,
                // todo resetto tutti i parametri utente? oppure quando visualizzo la pagina di signIn resetto tutto??
                error : action.payload.response.data.message,
                tokenSignIn : '',
            }
        }
    }
});

export const {signUpSuccess, signInSuccess, changeTokenEmail, meFromTokenFailure, meFromTokenSuccess} = user.actions;

export default user.reducer;





