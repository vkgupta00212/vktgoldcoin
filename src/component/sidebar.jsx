import React from "react";
import {
  X,
  LayoutDashboard,
  Wallet,
  ListOrdered,
  User,
  Info,
} from "lucide-react";
import logo from "../assets/coin.png";
import { info } from "autoprefixer";

const SideBar = ({ isOpen, onClose, selectedPage, setSelectedPage }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full md:w-[300px] w-[250px] bg-[#1e293b] text-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:shadow-none`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700 h-[100px]">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="md:h-[100px] md:w-[100px] h-[50px] w-[50px]"
          />
          <span className="text-lg font-bold">VKT Gold Coin</span>
        </div>
        <button className="text-white " onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 px-4 py-6 text-[18px] font-medium">
        <SidebarLink
          label="Dashboard"
          icon={LayoutDashboard}
          active={selectedPage === "Dashboard"}
          onClick={() => {
            setSelectedPage("Dashboard");
            if (window.innerWidth < 768) {
              onClose();
            }
          }}
        />
        <SidebarLink
          label="Refer&Earn"
          icon={Wallet}
          active={selectedPage === "Refer&Earn"}
          onClick={() => {
            setSelectedPage("ReferEarn");
            if (window.innerWidth < 768) {
              onClose();
            }
          }}
        />
        <SidebarLink
          label="Transactions"
          icon={ListOrdered}
          active={selectedPage === "Transactions"}
          onClick={() => {
            setSelectedPage("Transactions");
            if (window.innerWidth < 768) {
              onClose();
            }
          }}
        />
        <SidebarLink
          label="Wallet"
          icon={Wallet}
          active={selectedPage === "Wallet"}
          onClick={() => {
            setSelectedPage("Wallet");
            if (window.innerWidth < 768) {
              onClose();
            }
          }}
        />
        <SidebarLink
          label="Profile"
          icon={User}
          active={selectedPage === "Profile"}
          onClick={() => {
            setSelectedPage("Profile");
            if (window.innerWidth < 768) {
              onClose();
            }
          }}
        />

        <SidebarLink
          label="About Us"
          icon={Info}
          active={selectedPage === "About"}
          onClick={() => {
            setSelectedPage("About");
            if (window.innerWidth < 768) {
              onClose();
            }
          }}
        />
      </nav>
    </div>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ label, icon: Icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 w-full text-left ${
      active ? "bg-[#334155]" : "hover:bg-[#334155]"
    }`}
  >
    {Icon && <Icon size={24} />}
    <span>{label}</span>
  </button>
);

export default SideBar;
