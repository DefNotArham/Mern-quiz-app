import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import resultEmoji from "../utils/resultEmoji.js";

function StartQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [notFound, setNofound] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [completionBar, setCompletionBar] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/quiz/startQuiz/${id}`,
        );

        if (response.data.success) {
          setQuiz(response.data.quiz);
        } else {
          setNofound(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNofound(true);
        } else {
          setNofound(true);
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleNextBtn = () => {
    if (!userAnswers[currentQuestion]) {
      alert("Please select an asnwer before proceeding...");
      return;
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
      setQuizFinished(true);
    }

    return;
  };

  const handlePreviousBtn = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }

    return;
  };

  const handleSelection = (i) => {
    const letter = String.fromCharCode(65 + i);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = letter;

    setUserAnswers(newAnswers);

    const answeredCount = newAnswers.filter((ans) => ans !== undefined).length;
    setCompletionBar((answeredCount / quiz.questions.length) * 100);
  };

  const handleFinishQuiz = () => {
    let quizScore = 0;

    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) quizScore++;
    });

    setScore(quizScore);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 font-semibold text-xl">
        Loading quiz...
      </div>
    );
  }
  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-200 via-red-300 to-red-400 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
          <h1 className="text-6xl font-bold text-red-700 mb-4">😕</h1>
          <h2 className="text-3xl font-bold text-red-800 mb-2">
            Quiz Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn’t find the quiz you were looking for. It may have
            been removed or the ID is incorrect.
          </p>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  const question = quiz.questions[currentQuestion];

  if (quizFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
          <h1 className="text-6xl font-bold text-green-700 mb-4">
            {resultEmoji(score, quiz.questions.length)}
          </h1>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            Quiz Completed!
          </h2>
          <p className="text-gray-700 text-xl mb-6">
            Your score: {score} / {quiz.questions.length}
          </p>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-green-300 to-green-400 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            {quiz.title}
          </h1>
          <p className="text-gray-600 font-semibold">{quiz.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Question {currentQuestion + 1}: {question.question}
          </h2>
          <div className="grid gap-4">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  handleSelection(i);
                }}
                className={`bg-green-200 hover:bg-green-400 text-gray-800 p-3 rounded-2xl text-left  duration-300 cursor-pointer hover:-translate-y-1 transition-all ${
                  userAnswers[currentQuestion] === String.fromCharCode(65 + i)
                    ? "bg-green-400"
                    : "bg-green-200 hover:bg-green-400"
                }`}
              >
                <span className="font-semibold mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousBtn}
            className="bg-gray-400 text-white px-5 py-3 rounded-2xl hover:bg-gray-600  duration-300 hover:-translate-y-1 transition-all cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={handleNextBtn}
            className="bg-green-700 text-white px-5 py-3 rounded-2xl hover:bg-green-800 duration-300 hover:-translate-y-1 transition-all cursor-pointer"
          >
            {currentQuestion < quiz.questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className={`bg-green-700 h-3 transition-all duration-300`}
              style={{ width: `${completionBar}%` }}
            ></div>
          </div>
          <div className="text-right text-gray-600 mt-1">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartQuiz;
