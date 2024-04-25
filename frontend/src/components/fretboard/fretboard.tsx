import styled from 'styled-components'

import Fret from './fret';
import { useAppSelector } from '../../redux/hooks';


const FretboardStyle = styled.div`
    display: flex;
    flex-direction: row;
`

function Fretboard() {

    return (
        <FretboardStyle>
            <Fret position={0} />
            <Fret position={1} />
            <Fret position={2} />
            <Fret position={3} />
            <Fret position={4} />
            <Fret position={5} />
            <Fret position={6} />
            <Fret position={7} />
            <Fret position={8} />
            <Fret position={9} />
            <Fret position={10} />
            <Fret position={11} />
            <Fret position={12} />
        </FretboardStyle>
    )
}

export default Fretboard;

