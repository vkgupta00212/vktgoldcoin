import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/coin.png";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !password) {
      setError("Enter username and password!");
    } else {
      setError("");
      setLoading(true);

      // Simulate login process
      setTimeout(() => {
        setLoading(false);
        alert("Logged in successfully!");
        navigate("/");
      }, 2000);
    }
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 100 20v-2a8 8 0 118-8h2A10 10 0 0012 2z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 animate-slide-bounce">
      <div className="bg-white p-8 rounded-[15px] shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="h-[80px] w-[80px] mb-2 md:h-[120px] md:w-[120px]"
          />
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">
            VKT GOLD COIN
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Log in to your account to continue
          </p>
        </div>
        {/* Error Message */}
        {error && (
          <p className="text-red-600 md:text-[18px] text-[13px] mt-10 bg-red-200 rounded-[10px] p-4 text-center animate-slide-bounce">
            {error}
          </p>
        )}
        {/* Login Form */}
        <div className=" mt-10"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[16px] font-medium mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="text-[17px] w-full p-2  border-b-2 border-b-blue-300 focus:outline-none focus:border-b-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[16px] font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="text-[17px] w-full p-2 border-b-2 border-b-blue-300 focus:outline-none focus:border-b-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-end justify-end mb-6">
            <a href="#" className="text-[16px] text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full transition-colors flex justify-center items-center gap-2
    ${
      loading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner /> <span>Loging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
