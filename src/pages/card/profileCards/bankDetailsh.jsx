import React, { useState, useEffect } from "react";
import bankDetailshShowAPI from "../../../backend/bank/bankDetailsh";
import BankDetailshInsert from "../../../backend/bank/bankDetailshInsert";
import BankDetailshUpdate from "../../../backend/bank/bankDetailshUpdate.js";

const BankDetailsh = () => {
  const email = localStorage.getItem("userEmail") || "";
  const phone = localStorage.getItem("userPhone") || "";
  const [userDetailsh, setUserDetailsh] = useState(null);
  const [editedDetails, setEditedDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);

  const fields = [
    { label: "Account Holder Name", key: "accountHolderName" },
    { label: "Account Number", key: "accountNumber" },
    { label: "IFSC Code", key: "bankIFSC" },
    { label: "Bank Name", key: "bankName" },
    { label: "Branch Name", key: "branchName" },
  ];

  const fetchBankDetails = async () => {
    try {
      const res = await bankDetailshShowAPI(email);
      if (Array.isArray(res) && res.length > 0) {
        const user = res[0];
        const userData = {
          accountHolderName: user.Accountholder,
          accountNumber: user.Accountnumber,
          bankIFSC: user.IFSC,
          bankName: user.BankName,
          branchName: user.Branch,
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
    if (email) fetchBankDetails();
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
        // Call Insert API
        await BankDetailshInsert(
          editedDetails.accountNumber || "",
          editedDetails.bankIFSC || "",
          editedDetails.branchName || "",
          editedDetails.accountHolderName || "",
          editedDetails.bankName || "",
          phone,
          email
        );
        alert("✅ Bank details inserted successfully!");
      } else {
        await BankDetailshUpdate(
          editedDetails.accountNumber || "",
          editedDetails.bankIFSC || "",
          editedDetails.branchName || "",
          editedDetails.accountHolderName || "",
          editedDetails.bankName || "",
          phone,
          email
        );
        alert("✅ Bank details updated successfully!");
      }

      setIsEditing(false);
      setIsNewEntry(false);
      fetchBankDetails(); // Refresh data after save
    } catch (err) {
      console.error("Error saving bank details:", err.message);
      alert("❌ Failed to save bank details. Please try again.");
    }
  };

  return (
    <div className="bg-blue-100 py-4 w-full">
      {!isEditing ? (
        userDetailsh ? (
          <>
            <div className="grid grid-cols-2 font-semibold border-b pb-2 px-4 text-[20px] md:text-[22px]">
              <div className="flex items-start justify-start">Bank Details</div>
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
            <p className="text-lg mb-4">No bank details found.</p>
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

export default BankDetailsh;
