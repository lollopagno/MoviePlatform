import {createSlice} from '@reduxjs/toolkit';

export const signIn = createSlice({
    name: 'signIn',
    initialState: {
        alert: undefined,
        isSuccess: undefined
    },
    reducers: {
        setAlert: (state, action) => {
            const {alert, isSuccess} = action.payload
            return {
                ...state,
                alert: alert,
                isSuccess : isSuccess
            }
        },
        resetAlert: (state) => {
            return {
                ...state,
                alert: undefined,
                isSuccess : undefined
            }
        },
    }
});

export const {setAlert, resetAlert} = signIn.actions;

export default signIn.reducer;
