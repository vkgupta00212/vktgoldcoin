import React, { useEffect, useState } from "react";
import TransactionHistoryShow from "../../backend/transactionHistory/transactionHistoryShow";

const TransferHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const res = await TransactionHistoryShow(email);

        if (Array.isArray(res) && res.length > 0) {
          setHistoryData(res); // directly set array of transactions
        } else {
          setHistoryData([]); // handle no data
        }
      } catch (err) {
        console.error("Error loading transaction history:", err);
      }
    };

    fetchTransactionData();
  }, []);

  // Create rows using for loop
  let transactionRows = [];

  for (let i = 0; i < historyData.length; i++) {
    const item = historyData[i];
    transactionRows.push(
      <div
        key={item.ID || i}
        className={`grid grid-cols-5 border-b-[1px] border-gray-950 text-[10px] md:text-[20px] px-4 py-3 ${
          i % 2 === 0 ? "bg-blue-200" : ""
        }`}
      >
        <div className="flex items-center justify-center">
          {item.TransactionID}
        </div>
        <div className="flex items-center justify-center">
          {item.TransactionAmt}
        </div>
        <div className="flex items-center justify-center">
          {new Date(item.TDate).toLocaleDateString()}
        </div>
        <div
          className={`flex items-center justify-center ${
            item.Status === "Completed"
              ? "text-green-500"
              : item.Status === "Pending"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {item.Status}
        </div>
        <div className="flex items-center justify-center">
          {item.TransactionType}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 py-2">
      {/* Header */}
      <div className="grid grid-cols-5 font-semibold border-b pb-2 px-4 text-[12px] md:text-[22px]">
        <div className="flex items-center justify-center">ID</div>
        <div className="flex items-center justify-center">Amount</div>
        <div className="flex items-center justify-center">Date</div>
        <div className="flex items-center justify-center">Status</div>
        <div className="flex items-center justify-center">Type</div>
      </div>

      {/* Data Rows */}
      {transactionRows.length === 0 ? (
        <div className="text-center text-gray-500 py-6 text-[14px] md:text-[18px]">
          No transactions found.
        </div>
      ) : (
        transactionRows
      )}
    </div>
  );
};

export default TransferHistory;
