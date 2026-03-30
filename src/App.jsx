import HomePage from "./pages/HomePage";
import CreateQuiz from "./pages/CreateQuiz";
import { Route, Routes } from "react-router";
import { useState } from "react";

function App() {
  const [questions, setQuestions] = useState([
    {
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
    </Routes>
  );
}

export default App;
