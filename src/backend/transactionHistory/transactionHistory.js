// src/backend/transaction/TransactionHistory.js
import axios from "axios";

const TransactionHistory = async ({
  TransactionID,
  TransactionAmt,
  TransactionPurpose,
  TransactionType,
  Status,
  TDate,
  Accountnumber,
  IFSC,
  Branch,
  Email,
}) => {
  const formData = new URLSearchParams();

  formData.append("token", "ALJDFHAGEJJJKL"); // Replace with your actual token
  formData.append("TransactionID", TransactionID || "");
  formData.append("TransactionAmt", TransactionAmt || "");
  formData.append("TransactionPurpose", TransactionPurpose || "");
  formData.append("TransactionType", TransactionType || "");
  formData.append("Status", Status || "");
  formData.append("TDate", TDate || "");
  formData.append("Accountnumber", Accountnumber || "");
  formData.append("IFSC", IFSC || "");
  formData.append("Branch", Branch || "");
  formData.append("Email", Email || "");

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/TransactionHistorys", // Update this with the correct endpoint if different
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("✅ Transaction saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error while posting transaction:", error.message);
    throw new Error("Transaction submission failed.");
  }
};

export default TransactionHistory;
