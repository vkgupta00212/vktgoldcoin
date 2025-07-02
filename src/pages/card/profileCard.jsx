import React from "react";

const ProfileCard = ({ setSelectedPage }) => {
  const handlePageChange = () => {
    setSelectedPage("ReferEarn");
  };

  return (
    <div className="bg-inherit text-center py-8">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center">
        <h2 className="md:text-[28px] text-[22px] font-bold">VISHAL KUMAR!</h2>
        <p className="md:text-[23px] mt-2">Mobile No.: 7700818001</p>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handlePageChange}
            className="bg-gray-800 md:text-[22px] text-white px-4 py-2 rounded font-medium"
          >
            REFERRAL LINKS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
