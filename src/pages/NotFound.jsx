// src/pages/NotFound.jsx
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
