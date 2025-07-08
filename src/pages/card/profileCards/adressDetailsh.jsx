import React, { useState, useEffect } from "react";
import AdressInsert from "../../../backend/adress/AdressAPI.js";
import AdressShow from "../../../backend/adress/AdressShowAPI.js";

const AdressDetailsh = () => {
  const email = localStorage.getItem("userEmail") || "";
  const phone = localStorage.getItem("userPhone") || "";
  const [userDetailsh, setUserDetailsh] = useState(null);
  const [editedDetails, setEditedDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);

  const fields = [
    { label: "Village", key: "village" },
    { label: "City", key: "City" },
    { label: "State", key: "State" },
    { label: "Pin Code", key: "Pincode" },
    { label: "Country", key: "Country" },
  ];

  const fetchAdressDetails = async () => {
    try {
      const res = await AdressShow(email);
      if (Array.isArray(res) && res.length > 0) {
        const user = res[0];
        const userData = {
          village: user.AddressLine2,
          City: user.City,
          State: user.State,
          Pincode: user.Pincode,
          Country: user.Country,
        };
        setUserDetailsh(userData);
      } else {
        setUserDetailsh(null);
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setUserDetailsh(null);
    }
  };

  useEffect(() => {
    if (email) fetchAdressDetails();
  }, [email]);

  const handleEditClick = () => {
    setEditedDetails(userDetailsh || {});
    setIsEditing(true);
    setIsNewEntry(false);
  };

  const handleAddInfoClick = () => {
    setEditedDetails({});
    setIsEditing(true);
    setIsNewEntry(true);
  };

  const handleInputChange = (key, value) => {
    setEditedDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsNewEntry(false);
  };
  const handleSave = async () => {
    try {
      if (isNewEntry) {
        await AdressInsert(
          "Permanent", // Addresstype (can be "Home", "Permanent", etc.)
          editedDetails.village || "", // AddressLine1 (you are storing village here)
          editedDetails.village || "", // AddressLine2 (repeat or split if needed)
          editedDetails.City || "", // City
          editedDetails.State || "", // State
          editedDetails.Country || "", // Country
          editedDetails.Pincode || "", // Pincode
          phone,
          email
        );

        alert("✅ Address details inserted successfully!");
      } else {
        alert("✏️ Edit feature not yet connected to backend.");
      }

      setIsEditing(false);
      setIsNewEntry(false);
      fetchAdressDetails(); // Reload updated data
    } catch (err) {
      console.error("Error saving address details:", err.message);
      alert("❌ Failed to save address details. Please try again.");
    }
  };

  return (
    <div className="bg-blue-100 py-4 w-full">
      {!isEditing ? (
        userDetailsh ? (
          <>
            <div className="grid grid-cols-2 font-semibold border-b pb-2 px-4 text-[20px] md:text-[22px]">
              <div className="flex items-start justify-start">
                Adress Details
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
                <div className="flex items-start justify-start">
                  {item.label}
                </div>
                <div className="flex items-start justify-start">
                  {userDetailsh[item.key] || "-"}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">No Adress details found.</p>
            <button
              onClick={handleAddInfoClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow text-[18px] hover:bg-blue-700"
            >
              ➕ Add Bank Information
            </button>
          </div>
        )
      ) : (
        <>
          <div className="grid grid-cols-2 font-semibold border-b pb-2 px-4 text-[20px] md:text-[22px]">
            <div className="flex items-start justify-start">
              {isNewEntry ? "Add Bank Details" : "Edit Bank Details"}
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

export default AdressDetailsh;
