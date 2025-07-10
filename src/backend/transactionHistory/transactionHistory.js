// /backend/transactionHistory/TransactionHistoryInsert.js
import axios from "axios";

const TransactionHistoryInsert = async (
  TransactionAmt,
  TransactionPurpose,
  TransactionType,
  Status,
  TDate,
  Accountnumber,
  IFSC,
  Branch,
  Timages, // should be a base64 string or just a dummy string
  Coin,
  Email
) => {
  const formData = new URLSearchParams();

  // Append values safely (convert to string to avoid [object Object] errors)
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("TransactionAmt", String(TransactionAmt || ""));
  formData.append("TransactionPurpose", String(TransactionPurpose || ""));
  formData.append("TransactionType", String(TransactionType || ""));
  formData.append("Status", String(Status || ""));
  formData.append("TDate", String(TDate || new Date().toISOString()));
  formData.append("Accountnumber", String(Accountnumber || ""));
  formData.append("IFSC", String(IFSC || ""));
  formData.append("Branch", String(Branch || ""));
  formData.append("Timages", String(Timages || "")); // dummy base64 or filename
  formData.append("Coin", String(Coin || ""));
  formData.append("Email", String(Email || ""));

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/TransactionHistorys",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Transaction API Error:", error.message);
    throw new Error("Transaction submission failed.");
  }
};

export default TransactionHistoryInsert;
