import React from "react";
import TransactionD from "../card/transferHistory.jsx";

const TransactionDetails = () => {
  return (
    <div className="bg-gray-200 rounded-[15px] m-6 p-2 md:p-8 md:w-full  mx-auto animate-slide-bounce">
      <div className="p-2">
        <TransactionD />
      </div>
    </div>
  );
};

export default TransactionDetails;
