import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/login/register.jsx";
import Sidebar from "./component/sidebar.jsx";
import MainPage from "./AppLayout.jsx";
import BuyCoin from "./pages/buy_sell/buyPages.jsx";
import SellCoin from "./pages/buy_sell/sellPages.jsx";
import ProfilePage from "./pages/sideBarPages/userProfile.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/buycoin" element={<BuyCoin />} />
          <Route path="/sellcoin" element={<SellCoin />} />
          <Route path="/profileside" element={<ProfilePage />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
