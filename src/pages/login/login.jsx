import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { NavLink } from "react-router-dom";
import logo from "../../assets/coin.png";

const FloatingInput = ({ label, name, type = "text", autoComplete }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const floatLabel = isFocused || value !== "";

  return (
    <div className="relative mb-6">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        autoComplete={autoComplete}
        placeholder={isFocused ? label : ""}
        className="peer w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2
                   placeholder:text-lg placeholder:text-gray-400"
      />
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-200 text-gray-600 ${
          floatLabel ? "top-[-1rem] text-sm text-blue-500" : "top-2 text-base"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      setError("Enter username and password!");
    } else {
      setError("");
      alert("Logged in successfully!");
      navigate("/dashboard");
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-[#1e293b] px-4 animate-slide-bounce">
      <div className=" p-16 md:w-[1300px] flex flex-col justify-center items-center mx-auto ">
        <img
          src={logo}
          alt="Logo"
          className="md:h-[120px] md:w-[120px] mb-2 h-[120px] w-[120px]"
        />
        <h2 className="md:text-[45px] font-semibold text-white text-[25px]">
          VKT GOLD COIN
        </h2>
        <p className="md:text-[1.1rem] text-[15px] text-white mt-1">
          Log in to your account to continue
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px] md:w-[500px] md:h-[400px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded shadow">
              {error}
            </div>
          )}

          <div className="">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mt-10 text-[18px]">
                  <FloatingInput
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </div>

                <div className="mt-10 text-[18px]">
                  <FloatingInput
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="mb-4 text-right ]">
                <a
                  href="#"
                  className="text-[16px] text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mt-6 flex flex-row gap-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-[5px] shadow hover:bg-blue-700 
               active:scale-95 transition-transform duration-100 ease-in-out"
                >
                  LOG IN
                </button>

                {/* <button
                type="button"
                onClick={handleSignUp}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-[5px] shadow hover:bg-blue-700 
               active:scale-95 transition-transform duration-100 ease-in-out"
              >
                SIGN UP
              </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
