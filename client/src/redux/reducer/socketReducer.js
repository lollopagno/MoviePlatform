import {createSlice} from '@reduxjs/toolkit';
import {List} from 'immutable';

export const socket = createSlice({
    name: 'socket',
    initialState: {
        notice: 0,
        list: List([])
    },
    reducers: {
        eventNotice: (state, action) => {
            return {
                ...state,
                notice: state.notice + 1,
                list: state.list.push({id : action.payload})
            }
        },
        initialState: (state) => {
            return {
                ...state,
                notice: 0,
                list: []
            }
        }
    }
});

export const {eventNotice, initialState} = socket.actions;
export default socket.reducer;



