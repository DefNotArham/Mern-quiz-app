import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const handleCreateBtn = () => {
    navigate("/create");
  };

  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizes = await axios.get("http://localhost:8000/quiz/getquiz");
        setQuizes(quizes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/quiz/deletequiz/${id}`);

      setQuizes(quizes.filter((q) => q._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartQuiz = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/quiz/startQuiz/${id}`,
      );

      if (response.data.success) {
        navigate(`/quiz/${id}`);
      } else {
        navigate(`/404`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/404");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 min-h-screen">
      <div
        className={`bg-gradient-to-r from-[#a8e6a2] to-[#81c784] flex items-center justify-between p-5 rounded-b-3xl `}
      >
        <h1 className="text-4xl font-bold text-[#155724]">Quiz Dashboard</h1>
        <button
          className={`text-sm bg-gradient-to-r from-[#81c784] to-[#4caf50] flex gap-4 items-center p-3 text-white rounded-lg shadow-md cursor-pointer  hover:bg-gradient-to-r hover:from-[#4caf50] hover:to-[#388e3c] transform hover:-translate-y-0.5 hover:shadow-xl transition-all ease-in `}
          onClick={handleCreateBtn}
        >
          <FaPlus /> Create quiz
        </button>
      </div>

      <div className="flex p-5 gap-10 items-center flex-wrap px-20 justify-center mt-10 ">
        {quizes.map((q) => {
          return (
            <div
              key={q._id}
              className="bg-white p-5 rounded-2xl min-w-[320px] max-w-[400px] flex flex-col items-center text-center flex-wrap shadow-2xl hover:-translate-y-1 transition-all ease-in"
            >
              <div className="w-full">
                <h1 className="text-2xl font-bold text-emerald-600 wrap-anywhere   ">
                  {q.title}
                </h1>
                <p className="text-gray-600 font-semibold wrap-anywhere   ">
                  {q.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleStartQuiz(q._id);
                  }}
                  className="bg-gradient-to-r from-[#81c784] to-[#4caf50] px-4  py-3 rounded-2xl text-white text-xs font-semibold mt-4 cursor-pointer hover:-translate-y-1 transition-all ease-in"
                >
                  Start quiz
                </button>
                <button
                  onClick={() => deleteQuiz(q._id)}
                  className="bg-gradient-to-r from-[#fc2d53] to-[#f01111] px-5  py-3 rounded-2xl text-white text-xs font-semibold mt-4 cursor-pointer hover:-translate-y-1 transition-all ease-in"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
