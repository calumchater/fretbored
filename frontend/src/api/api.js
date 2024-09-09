
import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

// import { CookiesProvider, useCookies } from "react-cookie";

export const FretboredAPI = {
  getTriads: function (quizParams, cancel = false) {
    new Promise((resolve, reject) => {
      return api.request({
        url: `/triads`,
        method: "GET",
        params: { number_of_questions: quizParams.numberOfQuestions, strings: quizParams.strings },
        signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
      })
    })
  },
  // get scales ...
}

// export const ChordAPI = {
//   postSongUrl: function (quizParams, cancel = false) {
//     new Promise((resolve, reject) => {
//       return api.request({
//         url: `/chords`,
//         method: "GET",
//         params: { number_of_questions: quizParams.numberOfQuestions, strings: quizParams.strings },
//         signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
//       })
//     })
//   },
//   // get scales ...
// }

// defining the cancel API object for API
const cancelApiObject = defineCancelApiObject(FretboredAPI)