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
            const {id, title, category} = action.payload
            return {
                ...state,
                notice: state.notice + 1,
                list: state.list.push({id : id, title: title, category: category})
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



