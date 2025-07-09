import React from "react";
import carGift from "../../../assets/car.png";
const ReferAndEarnCard = () => {
  return (
    <div className="bg-gray-200 rounded-[15px] mt-6 p-4 md:p-8 md:w-full mx-auto">
      <div className="flex justify-center mb-6">
        <img
          src={carGift}
          alt="carGift"
          className="md:h-[300px] md:w-[600px] h-[150px] w-[300px] "
        />
      </div>
      <h2 className="text-center text-[30px] font-semibold mb-4">
        Refer & Earn
      </h2>
      <p className="text-center font-normal text-[22px] mb-6">
        Invite 3500 friends to join our platform and get a chance to win a car!
      </p>
      <div className="text-center">
        <button className="bg-blue-700 w-[250px] h-[50px] text-white px-6 py-2 rounded-full shadow text-[18px]">
          Share Your Referral Link
        </button>
      </div>
    </div>
  );
};

export default ReferAndEarnCard;
