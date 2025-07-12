import React, { useState, useEffect } from "react";
import getCustomerData from "../../backend/detailsh/getCustomerData.js";
import ReferCount from "../../backend/refer/referCount.js";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ProfileCard = ({ setSelectedPage }) => {
  const Email = localStorage.getItem("userEmail");
  const [userDetails, setUserDetails] = useState({});
  const [referCount, setReferCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get user details using Email
        const res = await getCustomerData(Email);
        console.log("User Data Response:", res);

        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          const referCode = user.reffer;

          setUserDetails({
            name: user.Name,
            mobile: user.Phone,
            referCode: referCode,
          });

          // Step 2: Now fetch refer count using referCode
          const referRes = await ReferCount(referCode);
          console.log("ReferCount Response:", referRes);

          if (Array.isArray(referRes) && referRes.length > 0) {
            setReferCount(referRes[0].Column1);
          }
        }
      } catch (error) {
        console.error("Error in ProfileCard data fetch:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = () => {
    setSelectedPage("ReferEarn");
  };

  const handleCopy = () => {
    if (userDetails.referCode) {
      navigator.clipboard.writeText(userDetails.referCode);
      toast.success("Refer code copied!");
    }
  };

  return (
    <div className="bg-inherit text-center py-8">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center">
        <h2 className="md:text-[28px] text-[22px] font-bold">
          {userDetails.name || "Loading..."}
        </h2>
        <p className="md:text-[23px] mt-2 font-medium">
          Mobile No: {userDetails.mobile || "Loading..."}
        </p>
        <p className="md:text-[23px] mt-2 font-medium flex items-center gap-2">
          My Refer Code: {userDetails.referCode}
          {userDetails.referCode && (
            <FaRegCopy
              className="cursor-pointer hover:text-blue-600"
              onClick={handleCopy}
              title="Copy refer code"
            />
          )}
        </p>
        <p className="md:text-[23px] mt-2 font-medium">
          Referred: {referCount}
        </p>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handlePageChange}
            className="bg-gray-800 md:text-[22px] text-white px-4 py-2 rounded font-medium"
          >
            Refer & Earn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
