import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import vktlogo from "../../assets/coin.png";
import { useSharedCoinValue } from "../../backend/coins/liveprice";

const GoldCoin = () => {
  const { coinValue, changePercent } = useSharedCoinValue(); // ✅ use shared store
  const isPositive = changePercent.startsWith("+");

  return (
    <div className="flex justify-center items-center bg-inherit">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-5 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-start items-start transition-all duration-300 hover:shadow-lg">
        {/* Logo Section */}
        <div className="bg-orange-500 rounded-full flex justify-center items-center mb-4">
          <img
            src={vktlogo}
            alt="VKT Gold Coin"
            className="md:h-[100px] md:w-[100px] w-[70px] h-[70px]"
          />
        </div>

        {/* Coin Details */}
        <div className="text-start mb-1">
          <p className="md:text-[35px] text-[25px] font-semibold">
            VKT Gold Coin
          </p>
          <p className="text-gray-600 text-[20px] md:text-[30px]">
            ₹{coinValue.toFixed(2)}
          </p>
        </div>

        {/* Price Change Indicator */}
        <div
          className={`flex items-center text-[25px] md:text-[40px] font-medium ${
            isPositive ? "text-green-600" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <FaArrowUp className="mr-2" />
          ) : (
            <FaArrowDown className="mr-2" />
          )}
          {changePercent}
        </div>
      </div>
    </div>
  );
};

export default GoldCoin;
