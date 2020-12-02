import {createSlice} from '@reduxjs/toolkit';

export const signIn = createSlice({
    name: 'signIn',
    initialState: {
        alert: undefined,
    },
    reducers: {
        setAlert: (state, action) => {
            return {
                ...state,
                alert: action.payload
            }
        },
        resetAlert: (state) => {
            return {
                ...state,
                alert: undefined
            }
        },
    }
});

export const {setAlert, resetAlert} = signIn.actions;

export default signIn.reducer;
