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
            return {
                ...state,
                _id: action.payload._id
            }
        }
    }
});

export const {signUpSuccess, signInSuccess} = user.actions;

export default user.reducer;





