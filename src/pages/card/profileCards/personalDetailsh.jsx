import React, { useState, useEffect } from "react";
import getCustomerData from "../../../backend/detailsh/getCustomerData";

const PersonalDetailsh = () => {
  const email = localStorage.getItem("userEmail");
  const [userDetailsh, setUserDetailsh] = useState({});
  const [editedDetails, setEditedDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { label: "Name", key: "name" },
    { label: "Mobile No.", key: "mobile" },
    { label: "Adhar Number", key: "Adhar" },
    { label: "Email Id", key: "email" },
    { label: "PAN", key: "pan" },
  ];

  useEffect(() => {
    const fetchUserDetailsh = async () => {
      try {
        const res = await getCustomerData(email);
        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          const userData = {
            name: user.Name + " " + user.LastName,
            mobile: user.Phone,
            Adhar: user.AadharCard,
            email: user.Email,
            pan: user.PenCard,
          };
          setUserDetailsh(userData);
        }
      } catch (error) {
        console.log("Error in Personal Detailsh", error);
      }
    };
    fetchUserDetailsh();
  }, [email]);

  const handleEditClick = () => {
    setEditedDetails(userDetailsh); // Copy current values to editable fields
    setIsEditing(true);
  };

  const handleInputChange = (key, value) => {
    setEditedDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setUserDetailsh(editedDetails); // Update view with new values
    setIsEditing(false);
    // TODO: Optionally send editedDetails to backend API
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-blue-100 py-4 w-full">
      {!isEditing ? (
        <>
          <div className="grid grid-cols-2 font-semibold border-b pb-2 px-4 text-[20px] md:text-[22px]">
            <div className="flex items-start justify-start">
              Personal Details
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEditClick}
                className="text-blue-600 hover:underline text-sm"
              >
                ✏️ Edit
              </button>
            </div>
          </div>

          {fields.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 border-b border-gray-950 text-[13px] md:text-[20px] px-4 py-3 ${
                index % 2 === 0 ? "bg-blue-200" : ""
              }`}
            >
              <div className="flex items-start justify-start">{item.label}</div>
              <div className="flex items-start justify-start">
                {userDetailsh[item.key] || "Loading..."}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 font-semibold border-b pb-2 px-4 text-[20px] md:text-[22px]">
            <div className="flex items-start justify-start">
              Edit Personal Details
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="text-red-600 hover:underline text-sm"
              >
                ✖ Cancel
              </button>
            </div>
          </div>

          {fields.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 border-b border-gray-950 text-[13px] md:text-[20px] px-4 py-3 ${
                index % 2 === 0 ? "bg-blue-200" : ""
              }`}
            >
              <div className="flex items-start justify-start">{item.label}</div>
              <div className="flex items-start justify-start">
                <input
                  type="text"
                  value={editedDetails[item.key] || ""}
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                  className="w-full border px-2 py-1 rounded-md text-[16px]"
                />
              </div>
            </div>
          ))}

          <div className="text-center mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-[5px] shadow text-[18px] hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalDetailsh;
