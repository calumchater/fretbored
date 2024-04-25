import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface IQuestions {
    [key: number]: {
        text: string;
        correctAnswers: Array<string>;
    }
}

interface IUserAnswers {
    [key: number]: Array<string>;
}


const quizInitialState = {
    numberOfQuestions: 0,
    currentQuestion: 1,
    tuning: 'STANDARD',
    questions: {} as IQuestions,
    userAnswers: {} as IUserAnswers,
    showNotes: false
}

const quizSlice = createSlice({
    name: "quizInfo",
    initialState:
        quizInitialState,
    reducers: {
        createQuiz: (state, action) => {
            state.numberOfQuestions = action.payload.numberOfQuestions;
            state.questions = Object.assign({}, state.questions, action.payload.questions)
            state.tuning = action.payload.tuning;
            state.showNotes = action.payload.showNotes
        },
        updateQuizAnswers: (state, action) => { // This reducer adds the answers when we submit to go to the next question
            // answers will come in the form
            // {questionNo: ["1,7","2,8","3.7"]}
            //
            state.userAnswers = Object.assign({}, state.userAnswers, action.payload)
        },
        incrementCurrentQuestion: (state) => {
            state.currentQuestion += 1
        },
        resetQuiz: (state) => { // reset the quiz 
            console.log("Resetting quiz")
            state = quizInitialState;
        }
    }
})


export const { createQuiz, updateQuizAnswers, incrementCurrentQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;