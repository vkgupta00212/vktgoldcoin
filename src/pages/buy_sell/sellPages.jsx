import React, { useState } from "react";
import { FaCoins } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

const SellPages = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const handleSell = () => {
    if (!amount || !accountNumber || !ifscCode) {
      alert("Please fill in all the details.");
      return;
    }

    // Handle sell logic here (e.g., API call)
    alert(
      `Selling ${amount} coins to A/C: ${accountNumber}, IFSC: ${ifscCode}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 animate-slide-bounce">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Card: Input */}
        <div className="bg-blue-100 p-6 rounded-3xl shadow-xl md:w-[400px] text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Sell Gold Coins
          </h2>

          {/* Number of Coins */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Number of Coins
            </label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-center text-[20px] text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter number of coins"
            />
          </div>

          {/* Bank Account Number */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Bank Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="text-[16px] text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter account number"
            />
          </div>

          {/* IFSC Code */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              className="text-[16px] text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter IFSC code"
            />
          </div>

          {/* Icon section (optional) */}
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl mb-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-400 text-white p-2 rounded-full">
                <FaCoins className="text-2xl" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Sell</p>
                <p className="text-md font-semibold">Gold Coin</p>
              </div>
            </div>
            <div className="text-gray-400 text-xl">›</div>
          </div>

          {/* Sell Button */}
          <button
            onClick={handleSell}
            className="w-full bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-300 text-white py-3 rounded-full font-semibold text-lg"
          >
            Sell Now
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Powered by <span className="font-semibold">VKT gold coin</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellPages;
