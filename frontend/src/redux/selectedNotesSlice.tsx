import { createSlice } from "@reduxjs/toolkit";

// Used to keep track of the notes selected for each answer 

// The format of the note identifier is:
// ${string},${position}
// This is unique and we need to compare this array with the one in the quiz db

// payload will always only contain this value

const selectedNotesSlice = createSlice({
    name: "selectedNotes",
    initialState: [] as string[],
    reducers: {
        resetSelectedNotes: (state) => {
            return []
        },
        addSelectedNote: (state, action) => {
            return [
                ...state,
                action.payload
            ]
        },
        removeSelectedNote: (state, action) => {
            return state.filter((note) => note !== action.payload)
        }
    }
})


export const { resetSelectedNotes, addSelectedNote, removeSelectedNote } = selectedNotesSlice.actions;
export default selectedNotesSlice.reducer;