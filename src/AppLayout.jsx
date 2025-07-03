import React, { useState } from "react";
import Navbar from "./component/Navbar.jsx";
import Sidebar from "./component/sidebar.jsx";
import HomePage from "./pages/Home/home.jsx";
import ReferAndEarnPage from "./pages/sideBarPages/referandearn.jsx";
import UserProfile from "./pages/sideBarPages/userProfile.jsx";
import TransactionDetails from "./pages/sideBarPages/transaction.jsx";
import AboutUs from "./pages/sideBarPages/aboutUs.jsx";

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full md:w-80 w-[250px] bg-[#1e293b] text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isDrawerOpen ? "md:ml-80" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar
          onDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)}
          isDrawerOpen={isDrawerOpen}
          setSelectedPage={setSelectedPage}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {selectedPage === "Dashboard" && (
            <HomePage setSelectedPage={setSelectedPage} />
          )}
          {selectedPage === "ReferEarn" && <ReferAndEarnPage />}
          {selectedPage === "Transactions" && <TransactionDetails />}
          {selectedPage === "Profile" && <UserProfile />}
          {selectedPage === "About" && <AboutUs />}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
