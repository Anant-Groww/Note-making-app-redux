import {configureStore, createStore} from '@reduxjs/toolkit'
import noteReducer from "../features/notes/NoteSlice"

const Store = configureStore({
    reducer: noteReducer,
});
export default Store
