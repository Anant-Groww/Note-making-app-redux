import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    disObj : [{title: 'test-title', value: 'test-value', date: new Date()}],
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            const note = {
                title: action.payload.title,
                value: action.payload.value,
                date: new Date(),
            }
            state.disObj.push(note);
        },
        removeNote: (state, action) => {
            // console.log('Removing note at index:', action.payload.index)
            state.disObj.splice(action.payload.index, 1);
        },

        editNote: (state, action) => {
            const newState = {
                ...state,
                disObj: [...state.disObj],
            };
        
            newState.disObj[action.payload.index] = {
            title: action.payload.title,
            value: action.payload.value,
            date: new Date(),
            };
            // console.log('Updated state:', action.payload.value);
            return newState;
        }
        
    }
})
export const {addNote, removeNote, editNote} = noteSlice.actions
export default noteSlice.reducer
