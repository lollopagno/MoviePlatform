import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
        email: undefined,
        username: undefined,
        name: undefined,
        _id: undefined
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
        resetUser: (state) => {
            return {
                ...state,
                email: undefined,
                username: undefined,
                name: undefined,
                _id: undefined
            }
        }
    }
});

export const {signUpSuccess, signInSuccess, resetUser} = user.actions;

export default user.reducer;





