import React from "react";

const CoinsCard = () => {
  return (
    <div className="md:w-[400px] w-[360px] shadow-md border border-gray-200 text-center">
      {/* Top Header */}
      <div className="bg-red-500 text-white text-[23px] px-3 py-1 font-medium">
        Final Coins
      </div>

      {/* Middle Content */}
      <div className="bg-white flex flex-col items-center justify-center py-6 h-[150px]">
        <h2 className="text-red-500 font-bold text-[20px] tracking-wide">
          FINAL COINS
        </h2>
        <p className="text-red-500 text-3xl font-semibold mt-2">0.00</p>
      </div>

      {/* Bottom Footer */}
      <div className="bg-red-500 text-[18px] text-black px-3 py-1 flex flex-col items-center">
        <span className="text-black font-light">
          As On: <span className="font-medium">22-06-2025</span>
        </span>
      </div>
    </div>
  );
};

export default CoinsCard;
