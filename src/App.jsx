import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/login/register.jsx";
import Sidebar from "./component/sidebar.jsx";
import MainPage from "./AppLayout.jsx";
import BuyCoin from "./pages/buy_sell/buyPages.jsx";
import SellCoin from "./pages/buy_sell/sellPages.jsx";
import ProfilePage from "./pages/sideBarPages/userProfile.jsx";
import ProtectedRoute from "./pages/login/privateRoute.jsx"; // new import

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sidebar"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buycoin"
          element={
            <ProtectedRoute>
              <BuyCoin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellcoin"
          element={
            <ProtectedRoute>
              <SellCoin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profileside"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
