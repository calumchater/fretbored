import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Header from "../header/header";

import { resetQuiz } from "../../redux/quizSlice";

function ResultsPage() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (quizInfo.numberOfQuestions === 0) {
            window.location.href = "/"
        }
        resultsRef = calculateResults;
    }, [])

    const quizInfo = useAppSelector(state => state.quizInfo)


    function calculateResults() {
        let correct = 0
        let incorrect = 0
        for (let i = 1; i <= quizInfo.numberOfQuestions; i++) {
            let correctAnswers = quizInfo.questions[i].correctAnswers;
            let userAnswers = quizInfo.userAnswers[i];

            // Check to see if the answer arrays all contain the same notes - order is not important
            let difference = correctAnswers.filter(x => !userAnswers.includes(x));

            if (difference.length === 0) {
                correct++
            } else {
                incorrect++
            }
        }

        dispatch(resetQuiz())

        return {
            correct: correct,
            incorrect: incorrect
        }
    }

    var resultsRef: any = useRef('')

    return (
        <div className="quizPage">
            <Header />
            <p> Final Score: {resultsRef.current.correct}</p>
            <p> Final Score: {resultsRef.current.correct}</p>
        </div>
    )
}

export default ResultsPage;

