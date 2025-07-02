import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/coin.png";
import userImg from "../assets/user.png";
import { TbGridDots } from "react-icons/tb";
const Navbar = ({
  onDrawerToggle,
  isDrawerOpen,
  selectedPage,
  setSelectedPage,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setShowDropdown(false);
    if (option === "Logout") {
      navigate("/login");
    }
    if (option === "Profile") {
      setSelectedPage("Profile");
    }
  };

  return (
    <nav className="flex justify-between items-center px-10 py-10 border-b border-gray-200 bg-white h-[100px] shadow-md">
      {/* Left: Menu + Logo + Title */}
      <div
        className={`flex items-center gap-3 transition-all duration-500 ease-in-out md:w-[600px] w-[150px] 
        ${
          isDrawerOpen
            ? "opacity-0 -translate-x-5 pointer-events-none"
            : "opacity-100 translate-x-0"
        }
        `}
      >
        <button
          onClick={onDrawerToggle}
          className="bg-transparent border-none cursor-pointer"
        >
          <TbGridDots className="w-[30px] h-[30px] to-black md:w-[50px] md:h-[50px]" />
        </button>

        <img
          src={logo}
          alt="Logo"
          className="w-[70px] h-[70px] md:w-[90px] md:h-[90px]"
        />
        <span className="text-2xl font-bold hidden sm:inline">
          VKT Gold Coin
        </span>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setShowDropdown(!showDropdown)}
        >
          <img
            src={userImg}
            alt="Avatar"
            className="w-[45px] h-[45px] rounded-full md:w-[50px] md:h-[50px]"
          />
          <span className="text-[14px] md:text-lg">Vishal</span>
          <ChevronDown />
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-[140px] z-50">
            <button
              onClick={() => handleOptionClick("Profile")}
              className="w-full text-left py-1 hover:bg-gray-100 px-2"
            >
              Profile
            </button>
            <button
              onClick={() => handleOptionClick("Logout")}
              className="w-full text-left py-1 hover:bg-gray-100 px-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
