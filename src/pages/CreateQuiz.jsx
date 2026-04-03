import axios from "axios";
import { useNavigate } from "react-router";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

function CreateQuiz({
  questions,
  setQuestions,
  quizTitle,
  setQuizTitle,
  quizDescription,
  setQuizDescription,
}) {
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now() + Math.random(),
        question: "",
        description: "",
        options: ["", "", "", ""],
        answer: "",
        edit: false,
      },
    ]);
  };

  const handleToggleEdit = (index) => {
    const updated = [...questions];
    updated[index].edit = !updated[index].edit;
    setQuestions(updated);
  };

  const handleDeleteBtn = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();
  const handleDashboardBtn = () => {
    navigate("/");
  };

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const createQuizFunction = async () => {
    setError("");
    try {
      const response = await axios.post(`http://localhost:8000/quiz/create`, {
        title: quizTitle,
        description: quizDescription,
        questions,
      });

      setSuccessMessage("Quiz created!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setQuestions([
        {
          id: Date.now(),
          question: "",
          description: "",
          options: ["", "", "", ""],
          answer: "",
          edit: true,
        },
      ]);

      setQuizTitle("");
      setQuizDescription("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
    }

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      <button
        onClick={handleDashboardBtn}
        className="absolute top-10 left-10 text-sm bg-gradient-to-r from-[#81c784] to-[#4caf50] flex gap-2 items-center p-3 text-white rounded-lg shadow-md cursor-pointer  hover:bg-gradient-to-r hover:from-[#4caf50] hover:to-[#388e3c] transform hover:-translate-y-0.5 hover:shadow-xl transition-all ease-in "
      >
        <RxDashboard />
        Dashboard
      </button>
      <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 min-h-screen flex  items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-[60%]">
          <div className="mb-6 text-center flex items-center flex-col">
            <h1 className="text-4xl font-bold text-green-700">Create Quiz</h1>
            <p className="text-gray-500">Build your own quiz in seconds</p>
            {error && (
              <p className="text-red-500 mt-2 font-bold flex items-center gap-2 ">
                <MdError /> {error}
              </p>
            )}
            {successMessage && (
              <p className="text-emerald-500 mt-2 font-bold flex items-center gap-2">
                <FaCheckCircle /> {successMessage}
              </p>
            )}
          </div>

          <div className="w-full flex flex-col">
            <label className="text-gray-700 font-semibold p-3">
              Quiz Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Quiz title"
              required
              className="p-3 border border-gray-400 rounded-2xl"
              onChange={(e) => setQuizTitle(e.target.value)}
              value={quizTitle}
            />

            <textarea
              placeholder="Quiz Description"
              className="p-3 border border-gray-400 rounded-2xl mt-5 min-h-20"
              onChange={(e) => setQuizDescription(e.target.value)}
              value={quizDescription}
            ></textarea>
          </div>

          <div className="max-h-100 overflow-y-auto">
            {questions.map((q, index) => {
              return (
                <div key={q.id} className={`bg-green-50 p-8 rounded-2xl mt-5 `}>
                  <div className="flex justify-between items-center">
                    <h1 className="text-green-700 font-bold text-xl">
                      Question {index + 1}{" "}
                      <span className="text-red-500">*</span>
                    </h1>
                    <div className="flex items-center gap-3">
                      {" "}
                      <button
                        className="text-emerald-600 text-sm underline cursor-pointer font-semibold hover:text-emerald-400 hover:-translate-y-0.5 transition-all ease-in "
                        onClick={() => {
                          handleToggleEdit(index);
                        }}
                      >
                        {q.edit ? "Save" : "Edit"}
                      </button>
                      <button
                        className="text-red-500 text-sm underline cursor-pointer hover:text-red-300 transition-all hover:-translate-y-0.5 ease-in font-semibold "
                        onClick={() => {
                          handleDeleteBtn(index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className={` ${q.edit ? "" : "hidden"}`}>
                    <input
                      type="text"
                      placeholder="Enter your question"
                      className="border border-gray-400 w-full p-3 rounded-2xl bg-white mt-4"
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[index].question = e.target.value;
                        setQuestions(updated);
                      }}
                    />
                    <div className="grid grid-cols-2 gap-3 mt-3 ">
                      <input
                        type="text"
                        placeholder="Option A"
                        className="border border-gray-400 w-full rounded-2xl bg-white p-3"
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[index].options[0] = e.target.value;
                          setQuestions(updated);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Option B"
                        className="border border-gray-400 w-full rounded-2xl bg-white p-3"
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[index].options[1] = e.target.value;
                          setQuestions(updated);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Option C"
                        className="border border-gray-400 w-full rounded-2xl bg-white p-3"
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[index].options[2] = e.target.value;
                          setQuestions(updated);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Option D"
                        className="border border-gray-400 w-full rounded-2xl bg-white p-3"
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[index].options[3] = e.target.value;
                          setQuestions(updated);
                        }}
                      />
                    </div>
                    <select
                      className="border border-gray-400 w-full p-3 rounded-2xl bg-white mt-4 cursor-pointer text-gray-400"
                      value={q.answer}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[index].answer = e.target.value;
                        setQuestions(updated);
                      }}
                    >
                      <option value="">Select Correct Answer</option>

                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex flex-col items-center mt-20 gap-3">
            <button
              onClick={handleAddQuestion}
              className="w-full border  border-green-400 text-green-600 flex items-center justify-center p-3 rounded-xl font-medium  cursor-pointer hover:bg-green-100 transition gap-3"
            >
              <FaPlus /> Add Question
            </button>
            <button
              onClick={createQuizFunction}
              className="w-full cursor-pointer py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transform hover:-translate-y-1 shadow-md hover:shadow-xl transition"
            >
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateQuiz;
