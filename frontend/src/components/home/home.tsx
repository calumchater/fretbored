import styled from "styled-components"

import Header from "../header/header";
import { useState } from "react";
import Modal from "../utils/modal";
import QuizForm from "./quizForm";
import { useAppDispatch } from "../../redux/hooks";
import { resetQuiz } from "../../redux/quizSlice";

const QuizCardLayout = styled.div`
    display: grid;
    grid-template-areas:
        "notes triads"
        "scales octaves";
    grid-gap: 20px;
    margin: 10em;
    
`

const QuizCard = styled.div`

`

const NotesCard = styled(QuizCard)`
    grid-area: notes;
`

const TriadsCard = styled(QuizCard)`
    grid-area: triads;
`

const ScalesCard = styled(QuizCard)`
    grid-area: scales;
`

const OctavesCard = styled(QuizCard)`
    grid-area: octaves;
`

const QuizCardImage = styled.img`
`



function Home() {

    let dispatch = useAppDispatch()

    dispatch(resetQuiz())

    function showModal() {
        setShow(true)
    }

    function hideModal() {
        setShow(false)
    }

    var [quizType, setQuizType] = useState('')

    var [show, setShow] = useState(false);

    return (
        <>
            <Header />
            <Modal show={show} handleClose={() => { setQuizType(''); hideModal() }}>
                <QuizForm quizType={quizType}></QuizForm>
            </Modal>
            <QuizCardLayout>
                <NotesCard onClick={() => { setQuizType('note'); showModal() }}>
                    <figure>
                        <QuizCardImage src="https://images.unsplash.com/photo-1519002216000-200000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                        <figcaption>Notes</figcaption>

                    </figure>
                </NotesCard>
                <TriadsCard onClick={() => { setQuizType('triad'); showModal() }}>
                    <figure>
                        <QuizCardImage src="https://images.unsplash.com/photo-1519002216000-200000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                        <figcaption>Triads</figcaption>

                    </figure>
                </TriadsCard>
                <ScalesCard>
                    <figure>
                        <QuizCardImage src="https://images.unsplash.com/photo-1519002216000-200000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                        <figcaption>Scales</figcaption>

                    </figure> </ScalesCard>
                <OctavesCard>
                    <figure>
                        <QuizCardImage src="https://images.unsplash.com/photo-1519002216000-200000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                        <figcaption>Octaves</figcaption>

                    </figure></OctavesCard>
            </QuizCardLayout>
        </>
    )
}

export default Home;