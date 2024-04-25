import { MutableRefObject, useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { addSelectedNote, removeSelectedNote } from "../../redux/selectedNotesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const SELECTED_COLOR: string = "lightblue";
const DEFAULT_COLOR: string = "#AC3B61";

const NoteDesign = styled.div`
    background: rgb(255,236,180);
    background: linear-gradient(0deg, rgba(255,236,180,1) 48%, rgba(105,105,105,1) 50%, rgba(255,236,180,1) 52%);
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 3px solid silver;

`
const NoteButton = styled.button`
    border: none;
    border-radius: 50%;
    height: 5vh;
    width: 5vh;
    color: white;
    font-size: 20px;
    display: flex; 
    align-items: center;
    justify-content: center;
    background-color: #AC3B61;

    &:hover {  
        transform: scale(1.1);
        border: 1px solid silver;
    }
`

interface NoteEntryProps {
    startingNote: string;
    position: number;
    string: number;
}


const findNote = (startingNote: string, position: number): string => {
    var note: string = notes[(notes.indexOf(startingNote) + position) % 12]
    return note;
}

const Note = ({ startingNote, position, string }: NoteEntryProps) => {

    let dispatch = useAppDispatch()

    // Subscribe to the current question to force re-render when we go to the next question
    let currentQuestion = useAppSelector(state => state.quizInfo.currentQuestion)

    // Reset the button style when we go to the next question (when fretboard re-renders)
    useEffect(() => {
        console.log(selected())
        if (selected()) {
            noteBackgroundRef.current.style.backgroundColor = DEFAULT_COLOR;
        } 
    });

    function selected() {
        return noteBackgroundRef.current.style.backgroundColor === SELECTED_COLOR
    }

    function updateNote(): any {
        if (noteBackgroundRef.current.style.backgroundColor === SELECTED_COLOR) {
            noteBackgroundRef.current.style.backgroundColor = DEFAULT_COLOR
            // Update the selected notes in redux
            dispatch(removeSelectedNote(noteId))
        }
        else {
            noteBackgroundRef.current.style.backgroundColor = SELECTED_COLOR
            // add to redux
            dispatch(addSelectedNote(noteId))
        }
    }

    const noteId: string = `${string},${position}`

    // var [noteBackgroundColor, setNoteBackgroundColor] = useState(DEFAULT_COLOR);
    var noteBackgroundRef = useRef<any>()

    // For display purposes
    const noteName = findNote(startingNote, position)

    return (
        <NoteDesign>
            <NoteButton ref={noteBackgroundRef} onClick={() => updateNote()}>{noteName}</NoteButton>
        </NoteDesign>
    )
}

export default Note;