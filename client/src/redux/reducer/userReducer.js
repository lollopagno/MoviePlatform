import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
        email: '',
        username: '',
        name: '',
        _id: ''
    },
    reducers: {
        signUpSuccess: (state, action) => {
            const {email, name, username} = action.payload
            return {
                ...state,
                name: name,
                email: email,
                username: username
            }
        },
        signInSuccess: (state, action) => {
            const {email, name, username, _id} = action.payload
            return {
                ...state,
                _id: _id,
                name: name,
                username: username,
                email: email
            }
        },
        signOut: (state) => {
            return {
                ...state,
                email: '',
                username: '',
                name: '',
                _id: ''
            }
        }
    }
});

export const {signUpSuccess, signInSuccess, signOut} = user.actions;

export default user.reducer;





