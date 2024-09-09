import { createSlice } from "@reduxjs/toolkit";


const chordsInitialState = {
    currentChord: [],
    nextChord: []
}

const soloSlice = createSlice({
    name: "solo",
    initialState:
        chordsInitialState,
    reducers: {
        createChords: (state, action) => {
            state.currentChord = action.payload.currentChord;
            state.nextChord = action.payload.nextChord;
        },
        updateChords: (state, action) => { // This reducer adds the answers when we submit to go to the next question
            state.currentChord = action.payload.currentChord;
            state.nextChord = action.payload.nextChord;
        },
        resetChords: (state) => { // reset the quiz 
            console.log("Resetting quiz")
            state = chordsInitialState;
        }
    }
})


export const { createChords, updateChords, resetChords } = soloSlice.actions;
export default soloSlice.reducer;