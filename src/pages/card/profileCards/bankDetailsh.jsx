import React, { useState, useEffect } from "react";
import bankDetailshShowAPI from "../../../backend/bank/bankDetailsh";
import BankDetailshInsert from "../../../backend/bank/bankDetailshInsert";
import BankDetailshUpdate from "../../../backend/bank/bankDetailshUpdate.js";

/**
 * BankDetailsh Component
 * - Fetches bank details via bankDetailshShowAPI
 * - Supports edit/update and add (insert)
 * - Handles API returning a model instance, an array, or null
 */

const BankDetailsh = () => {
  const email = localStorage.getItem("userEmail") || "";
  const phone = localStorage.getItem("userPhone") || "";
  const [userDetailsh, setUserDetailsh] = useState(null); // normalized data object
  const [editedDetails, setEditedDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);

  // Fields used in UI (keys match component's normalized object)
  const fields = [
    { label: "Account Holder Name", key: "accountHolderName" },
    { label: "Account Number", key: "accountNumber" },
    { label: "IFSC Code", key: "bankIFSC" },
    { label: "Bank Name", key: "bankName" },
    { label: "Branch Name", key: "branchName" },
  ];

  // Normalize API response into the shape used by this component
  const normalizeApiToUi = (apiData) => {
    if (!apiData) return null;

    // If API returned an array: take first item
    if (Array.isArray(apiData) && apiData.length > 0) {
      apiData = apiData[0];
    }

    // If API returned a model-like object (BankDetailsModel) or raw object
    // It might have keys like: Accountnumber, IFSC, Branch, Accountholder, BankName
    // Or if it was converted to model earlier it may have accountNumber, ifsc, branch etc.
    return {
      accountHolderName:
        apiData.accountHolder ??
        apiData.Accountholder ??
        apiData.accountHolderName ??
        "",
      accountNumber:
        apiData.accountNumber ??
        apiData.Accountnumber ??
        apiData.accountNo ??
        "",
      bankIFSC: apiData.ifsc ?? apiData.IFSC ?? apiData.bankIFSC ?? "",
      bankName: apiData.bankName ?? apiData.BankName ?? "",
      branchName: apiData.branch ?? apiData.Branch ?? apiData.branchName ?? "",
    };
  };

  const fetchBankDetails = async () => {
    if (!email) return;
    try {
      const res = await bankDetailshShowAPI(email);

      // res could be:
      // - instance of BankDetailsModel (object with accountNumber/ifsc/...),
      // - an array [{...}],
      // - or null
      const normalized = normalizeApiToUi(res);

      if (normalized) {
        setUserDetailsh(normalized);
      } else {
        setUserDetailsh(null);
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setUserDetailsh(null);
    }
  };

  useEffect(() => {
    fetchBankDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const handleEditClick = () => {
    setEditedDetails(userDetailsh || {});
    setIsEditing(true);
    setIsNewEntry(false);
  };

  const handleAddInfoClick = () => {
    setEditedDetails({
      accountHolderName: "",
      accountNumber: "",
      bankIFSC: "",
      bankName: "",
      branchName: "",
    });
    setIsEditing(true);
    setIsNewEntry(true);
  };

  const handleInputChange = (key, value) => {
    setEditedDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsNewEntry(false);
    setEditedDetails({});
  };

  const handleSave = async () => {
    try {
      // map UI keys back to API param order used by your Insert/Update functions
      const accountNumber = editedDetails.accountNumber || "";
      const bankIFSC = editedDetails.bankIFSC || "";
      const branchName = editedDetails.branchName || "";
      const accountHolderName = editedDetails.accountHolderName || "";
      const bankName = editedDetails.bankName || "";

      if (isNewEntry) {
        await BankDetailshInsert(
          accountNumber,
          bankIFSC,
          branchName,
          accountHolderName,
          bankName,
          phone,
          email
        );
        alert("✅ Bank details inserted successfully!");
      } else {
        await BankDetailshUpdate(
          accountNumber,
          bankIFSC,
          branchName,
          accountHolderName,
          bankName,
          phone,
          email
        );
        alert("✅ Bank details updated successfully!");
      }

      setIsEditing(false);
      setIsNewEntry(false);
      fetchBankDetails(); // Refresh after save
    } catch (err) {
      console.error("Error saving bank details:", err);
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
