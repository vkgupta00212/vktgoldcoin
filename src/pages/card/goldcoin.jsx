import React from "react";
import { FaBitcoin } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import vktlogo from "../../assets/coin.png";

const GoldCoin = () => {
  const price = "₹3.97";
  const changePercent = "+0.37%";

  return (
    <div className=" flex justify-center items-center bg-inherit">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-start items-start">
        {/* Icon */}

        <div className="bg-orange-500  rounded-full ">
          <img
            src={vktlogo}
            alt="vktlogo"
            className="md:h-[100px] md:w-[100px] w-[70px] h-[70px]"
          />
        </div>

        {/* Title and Price */}
        <div className="text-start mb-4">
          <p className="md:text-[35px] text-[25px] font-semibold">
            VKT Gold Coin
          </p>
          <p className="text-gray-600 text-[20px] md:text-[30px]">{price}</p>
        </div>

        {/* Percentage Change */}
        <div className="flex items-center text-green-600 text-[25px] md:text-[40px] font-medium">
          <FaArrowUp className="mr-1" />
          {changePercent}
        </div>
      </div>
    </div>
  );
};

export default GoldCoin;
