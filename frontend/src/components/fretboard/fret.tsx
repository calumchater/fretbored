import styled from "styled-components"

import Note from "./note"

interface FretEntryProps {
    position: number;
}

const FretStyle = styled.div`
    background-color: lightbrown;
    display: flex;
    flex-direction: column;
    width: 8em;
`

const Fret = ({ position }: FretEntryProps) => {

    function findNote() {
        let notes: any = []
        return notes;
    }

    return (
        // Change starting note here if you want alternate tunings
        <FretStyle>
            <Note startingNote="E" position={position} string={1} />
            <Note startingNote="B" position={position} string={2} />
            <Note startingNote="G" position={position} string={3} />
            <Note startingNote="D" position={position} string={4} />
            <Note startingNote="A" position={position} string={5} />
            <Note startingNote="E" position={position} string={6} />
        </FretStyle>
    )
}

export default Fret;