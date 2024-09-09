import styled from "styled-components"
import Header from "../header/header"

import PropTypes from "prop-types";


import './soloPage.css'
import Stopwatch from "./stopwatch";
import Fretboard from "../fretboard/fretboard";

interface FretEntryProps {
    position: number;
}

// const FretStyle = styled.div`
//     background-color: lightbrown;
//     display: flex;
//     flex-direction: column;
//     width: 8em;
// `


// const YoutubeEmbed = (embedId: string) => {
//     return (<div className="video-responsive">
//         <iframe
//             width="853"
//             height="480"
//             src={`https://www.youtube.com/embed/${embedId}`}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="Embedded youtube"
//         />
//     </div>)
// }

// YoutubeEmbed.propTypes = {
//     embedId: PropTypes.string.isRequired
// };


const LinkSubmit = () => {

    return (
        <form>
            <input type="text"></input>
        </form>
    )
}



const SoloPage = () => {



    return (
        <>
            <Header />
            <LinkSubmit />
            <Fretboard />
            <Stopwatch />
        </>
    )
}

export default SoloPage;