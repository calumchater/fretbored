import Header from "../header/header"
import Fretboard from "../fretboard/fretboard";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { updateQuizAnswers, incrementCurrentQuestion, createQuiz } from "../../redux/quizSlice";

import './quizPage.css'

import { removeSelectedNote, resetSelectedNotes } from "../../redux/selectedNotesSlice";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

enum quizType {
    'NOTES',
    'TRIADS',
    'SCALES'
}

type QuizInfo = {
    numberOfQuestions: number;
    quizType: quizType;
    difficulty: number;
}

function NextButton() {

    const quizInfo = useAppSelector(state => state.quizInfo)
    const selectedNotes = useAppSelector(state => state.selectedNotes)

    let dispatch = useAppDispatch()

    function goToNextQuestion(): any {
        dispatch(updateQuizAnswers(selectedNotes))
        // if last question, redirect to results page and show what you got wrong and right
        if (quizInfo.currentQuestion === quizInfo.numberOfQuestions) {
            window.location.href = "/results"
        } else {
            dispatch(incrementCurrentQuestion())
            dispatch(resetSelectedNotes())
        }
    }

    const buttonText: string = quizInfo.currentQuestion === quizInfo.numberOfQuestions ? 'Finish Quiz' : 'Next Question'

    return (<button className="submitAnswer" onClick={() => { goToNextQuestion() }}> {buttonText}</button>)
}

const QuestionStyle = styled.div`
    font-size: 25px;
`

function Question() {

    const quizInfo = useAppSelector(state => state.quizInfo)

    return (
        <QuestionStyle>{quizInfo.questions[quizInfo.currentQuestion].text}</QuestionStyle>
    )
}



function QuizPage() {

    const dispatch = useAppDispatch()
    var { state } = useLocation();

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        state.quizInfo.questions.then((response: any) => { response.json(); setLoading(false) }).catch((err: any) => console.log(err))



    }, []);

    // Make sure we only create the quiz upon initial rendering of this component
    function useAndClearState() {
        if (state.quizInfo.numberOfQuestions === 0) {
            window.location.href = "/"
        } else {
            dispatch(createQuiz(state.quizInfo))
            // Empty it so that on the next re-render we don't create the quiz again
            state = {}
        }
    }

    return (
        <div className="quizPage">
            <Header />
            <div className="quizContainer">
                <Question />
                <Fretboard />
                <NextButton />
            </div>
            <p> Loading </p>
        </div>
    )
}

export default QuizPage;


