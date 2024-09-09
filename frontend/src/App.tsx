
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './components/home/home';
import QuizPage from './components/quiz/quizPage';
import ResultsPage from "./components/quiz/results";
import { ProtectedRoute, ProtectedRouteProps } from "./routing";
import { useAppSelector } from "./redux/hooks";
import SoloPage from "./components/solo/soloPage";


function App() {

  // const quizQuestions = useAppSelector(state => state.quizInfo.questions)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/solo" element={<SoloPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
}

export default App;


{/* <Route path='quiz' element={<ProtectedRoute homePath="/" quizQuestions={quizQuestions} outlet={<QuizPage />} />} />
<Route path='results' element={<ProtectedRoute homePath="/" quizQuestions={quizQuestions} outlet={<ResultsPage />} />} /> */}