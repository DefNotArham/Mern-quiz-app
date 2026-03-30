import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const handleCreateBtn = () => {
    navigate("/create");
  };

  return (
    <div>
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
    </div>
  );
}

export default HomePage;
