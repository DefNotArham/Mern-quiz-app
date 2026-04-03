import HomePage from "./pages/HomePage";
import CreateQuiz from "./pages/CreateQuiz";
import NotFound from "./pages/NotFound";
import StartQuiz from "./pages/StartQuiz";

import { Route, Routes } from "react-router";
import { useState } from "react";

function App() {
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      question: "",
      description: "",
      options: ["", "", "", ""],
      answer: "",
      edit: false,
    },
  ]);

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/create"
        element={
          <CreateQuiz
            questions={questions}
            setQuestions={setQuestions}
            quizTitle={quizTitle}
            setQuizTitle={setQuizTitle}
            quizDescription={quizDescription}
            setQuizDescription={setQuizDescription}
          />
        }
      />

      <Route path={`/quiz/:id`} element={<StartQuiz />} />

      <Route path={`/404`} element={<NotFound />} />
      <Route path={`*`} element={<NotFound />} />
    </Routes>
  );
}

export default App;
