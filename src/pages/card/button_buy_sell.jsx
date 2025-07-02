import React from "react";
import { useNavigate } from "react-router-dom";

const GoldCoin = () => {
  const price = "₹3.97";
  const changePercent = "+0.37%";
  const navigate = useNavigate();

  const buyNaviagte = () => {
    navigate("/buycoin");
  };

  const sellNaviagte = () => {
    navigate("/sellcoin");
  };

  return (
    <div className=" flex justify-center items-center bg-inherit">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center">
        <div className="text-[22px] md:text-[27px] text-[#000] font-medium">
          <h2>Buy & Sell</h2>
        </div>

        <div className="justify-center flex flex-col gap-4 mt-6">
          <div className=" mt-6 flex flex-col">
            <div className="w-[200px] mb-6 text-[15px] md:text-[20px]">
              <button
                type="submit"
                onClick={buyNaviagte}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-[25px] shadow hover:bg-blue-700
               active:scale-95 transition-transform duration-100 ease-in-out"
              >
                Buy
              </button>
            </div>

            <div className="w-[200px] text-[15px] md:text-[20px]">
              <button
                type="button"
                onClick={sellNaviagte}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-[25px] shadow hover:bg-blue-700
               active:scale-95 transition-transform duration-100 ease-in-out"
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
