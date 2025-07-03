import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoldCoin = () => {
  const price = "₹3.97";
  const changePercent = "+0.37%";
  const navigate = useNavigate();

  const buyNavigate = () => {
    navigate("/buycoin");
  };

  const sellNavigate = () => {
    navigate("/sellcoin");
  };

  return (
    <div className="flex justify-center items-center bg-inherit">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center">
        <h2 className="text-[22px] md:text-[27px] text-[#000] font-medium">
          Buy & Sell
        </h2>

        <div className="justify-center flex flex-col gap-4 mt-6">
          <div className="mt-6 flex flex-col">
            {/* Buy Button */}
            <div className="w-[200px] mb-6 text-[15px] md:text-[20px]">
              <button
                type="button"
                onClick={buyNavigate}
                className={`w-full font-semibold py-2 rounded-[25px] shadow transition-transform duration-100 ease-in-out flex justify-center items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 `}
              >
                Buy
              </button>
            </div>

            {/* Sell Button */}
            <div className="w-[200px] text-[15px] md:text-[20px]">
              <button
                type="button"
                onClick={sellNavigate}
                className={`w-full font-semibold py-2 rounded-[25px] shadow transition-transform duration-100 ease-in-out flex justify-center items-center gap-2 bg-red-600 text-white hover:bg-red-700`}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldCoin;
