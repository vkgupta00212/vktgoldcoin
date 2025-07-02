import React from "react";
import iphoneGift from "../../../assets/iphone_gift.png";
const ReferAndEarnCard = () => {
  return (
    <div className="bg-gray-200 rounded-[15px] mt-6 p-4 md:p-8 md:w-full mx-auto">
      <div className="flex justify-center mb-6">
        <img
          src={iphoneGift}
          alt="iphoneGift"
          className="md:h-[350px] md:w-[700px] h-[150px] w-[300px] "
        />
      </div>
      <h2 className="text-center text-[30px] font-semibold mb-4">
        Refer & Earn
      </h2>
      <p className="text-center font-normal text-[22px] mb-6">
        Invite 200 friends to join our platform and get a chance to win an
        iPhone 15 Pro Max!
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
