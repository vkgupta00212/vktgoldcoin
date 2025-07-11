import React, { useState, useEffect, use } from "react";
import getCustomerData from "../../backend/detailsh/getCustomerData.js";
import ReferCount from "../../backend/refer/referCount.js";

const ProfileCard = ({ setSelectedPage }) => {
  const Email = localStorage.getItem("userEmail");
  const [userDetails, setUserDetails] = useState({});
  const [referCount, setReferCount] = useState(0);

  useEffect(() => {
    const fetchUserRefer = async () => {
      try {
        const res = await ReferCount(Email);
        console.log("Profile card referCount", res);
        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          setReferCount(user.Column1);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserRefer();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getCustomerData(Email);
        console.log("API Response:", res);

        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          setUserDetails({
            name: user.Name,
            mobile: user.Phone,
            referCode: user.reffer,
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handlePageChange = () => {
    setSelectedPage("ReferEarn");
  };

  return (
    <div className="bg-inherit text-center py-8">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center">
        <h2 className="md:text-[28px] text-[22px] font-bold">
          {userDetails.name || "Loading..."}
        </h2>
        <p className="md:text-[23px] mt-2 font-medium">
          Mobile No : {userDetails.mobile || "Loading..."}
        </p>
        <p className="md:text-[23px] mt-2 font-medium">
          My Refer Code : {userDetails.referCode}
        </p>
        <p className="md:text-[23px] mt-2 font-medium">
          Refered : {referCount}
        </p>
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
