import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/coin.png";
import userImg from "../assets/user.png";
import { TbGridDots } from "react-icons/tb";
import getCustomerData from "../backend/detailsh/getCustomerData";

const Navbar = ({ onDrawerToggle, isDrawerOpen, setSelectedPage }) => {
  const Email = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [UserDetailsh, setUserDetailsh] = useState({ name: "", mobile: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // ✅ Load from sessionStorage or default image
  const [profileImg, setProfileImg] = useState(() => {
    return sessionStorage.getItem("profileImage") || userImg;
  });

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getCustomerData(Email);
        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          setUserDetailsh({
            name: user.Name,
            mobile: user.Phone,
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    fetchUserDetails();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setShowDropdown(false);
    if (option === "Logout") {
      setShowLogoutConfirm(true);
    }
    if (option === "Profile") {
      setSelectedPage("Profile");
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("profileImage"); // ✅ clear image on logout
    setShowLogoutConfirm(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="flex justify-between items-center px-10 py-10 border-b border-gray-200 bg-white h-[100px] shadow-md">
      {/* Left Side */}
      <div
        className={`flex items-center gap-3 transition-all duration-500 ease-in-out md:w-[600px] w-[150px] 
        ${
          isDrawerOpen
            ? "opacity-0 -translate-x-5 pointer-events-none"
            : "opacity-100 translate-x-0"
        }`}
      >
        <button
          onClick={onDrawerToggle}
          className="bg-transparent border-none cursor-pointer"
        >
          <TbGridDots className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setSelectedPage("Dashboard")}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-[70px] h-[70px] md:w-[90px] md:h-[90px]"
          />
          <span className="text-2xl font-bold hidden sm:inline">
            VKT Gold Coin
          </span>
        </div>
      </div>

      {/* Right Side - Profile */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 cursor-pointer"
          role="button"
        >
          <img
            src={profileImg}
            alt="Avatar"
            className="w-[45px] h-[45px] rounded-full md:w-[50px] md:h-[50px]"
          />
          <span className="text-[14px] md:text-lg">{UserDetailsh.name}</span>
          <ChevronDown />
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-[180px] z-50">
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

            {/* ✅ Upload New Profile Image */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64Img = reader.result;
                    setProfileImg(base64Img);
                    sessionStorage.setItem("profileImage", base64Img);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="mt-2 text-sm"
            />
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-slide-bounce">
          <div className="bg-white p-6 rounded-md shadow-lg text-center w-[300px]">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
