import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { IQuestions, createQuiz } from "../../redux/quizSlice"
import { FormEvent, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { FretboredAPI } from "../../api/api";

const QuizFormLayout = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 1em
`

const QuizSubmitButton = styled.button`
    padding: 30px;
    border-radius: 20px 20px;
    background: #FFFFF0;
    color: cadetblue;


    &:hover {
        background: cadetblue;
        color: #FFFFF0;
    }
`

function NoteQuizForm() {
    return (
        <>
            <label>How many questions would you like ? :
                <input type="number" min="5" max="30" id="numberOfQuestions" required defaultValue="5" />
            </label>
            <label>Show Notes :
                <input type="checkbox" min="5" max="30" id="showNotes" />
            </label>
        </>
    )
}

function TriadQuizForm() {
    return (
        <>
            <label>How many questions would you like ? :
                <input type="number" min="5" max="30" id="numberOfQuestions" required defaultValue="5" />
            </label>
            <label htmlFor="cars">On what strings:
                <select name="strings" id="strings">
                    <option value="[1,2,3]">1,2,3</option>
                    <option value="[2,3,4]">2,3,4</option>
                    <option value="[3.4,5]">3,4,5</option>
                    <option value="[4,5,6]">4,5,6</option>
                    {/* <option value="[]">All</option> */}
                </select>
            </label>
            <label>Show Notes :
                <input type="checkbox" min="5" max="30" id="showNotes" />
            </label>
        </>
    )
}

interface QuizFormProps {
    quizType: string
}

function QuizForm({ quizType }: QuizFormProps) {

    let navigate = useNavigate();

    function renderQuizFormType(quizType: string): React.ReactNode {
        switch (quizType) {
            case 'note':
                return <NoteQuizForm />
            case 'triad':
                return <TriadQuizForm />
        }
    }

    function buildQuiz(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Get questions here 

        let numberOfQuestions: number = parseInt((document.getElementById("numberOfQuestions") as HTMLInputElement).value);
        let showNotes: boolean = Boolean((document.getElementById("numberOfQuestions") as HTMLInputElement).value);
        let stringSelection = (document.getElementById("strings") as HTMLInputElement).value;

        let questions = FretboredAPI.getTriads({ numberOfQuestions: numberOfQuestions, strings: stringSelection })

        const quizObject = {
            numberOfQuestions: numberOfQuestions,
            showNotes: showNotes,
            questions: questions,
            tuning: 'STANDARD'
        }

        navigate('/quiz', {
            state: { quizInfo: quizObject },
        }
        )

    }


    return (
        <QuizFormLayout onSubmit={(e) => buildQuiz(e)}>
            {renderQuizFormType(quizType)}
            <QuizSubmitButton type="submit">Start Quiz</QuizSubmitButton>
        </QuizFormLayout>
    )
}

export default QuizForm;