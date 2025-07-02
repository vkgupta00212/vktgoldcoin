import React, { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { FaFlagUsa } from "react-icons/fa";

const BuyCryptoCard = () => {
  const [amount, setAmount] = useState(300);
  const btcRate = 0.00247;

  const presetAmounts = [100, 250, 500, 1000];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xs text-center">
        {/* Flag and Gear */}
        <div className="flex justify-between items-center mb-4">
          <FaFlagUsa className="text-2xl" />
          <span className="text-lg font-medium">Buy</span>
          <button>
            <span className="text-gray-400 text-xl">⚙️</span>
          </button>
        </div>

        {/* Price */}
        <div className="text-4xl font-bold mb-2">${amount}</div>
        <div className="text-sm text-gray-500 flex justify-center items-center mb-4">
          {btcRate} BTC <FiRefreshCcw className="ml-1" />
        </div>

        {/* Preset Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`py-2 rounded-full border ${
                amount === amt
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Buy Bitcoin */}
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-6">
          <div className="flex items-center space-x-2">
            <FaBitcoin className="text-orange-500 text-2xl" />
            <div className="text-left">
              <p className="text-sm text-gray-500">Buy</p>
              <p className="text-md font-semibold">Bitcoin</p>
            </div>
          </div>
          <div className="text-gray-400 text-xl">›</div>
        </div>

        {/* Continue Button */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold text-lg">
          Continue
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-4">
          Powered by <span className="font-semibold">MoonPay</span>
        </p>
      </div>
    </div>
  );
};

export default BuyCryptoCard;
