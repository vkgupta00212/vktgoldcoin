import React, { useState, useEffect, useRef } from "react";
import { FaCoins } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import QRCode from "react-qr-code";
import TransactionHistory from "../../backend/transactionHistory/transactionHistory.js";

const BuyPages = () => {
  const [amount, setAmount] = useState(10);
  const [totalAmount, setTotalAmount] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [utrId, setUtrId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loadingBuy, setLoadingBuy] = useState(false);

  const goldRate = 300;
  const presetAmounts = [100, 250, 500, 1000];

  const summaryRef = useRef(null);
  const uploadRef = useRef(null);

  const handleContinue = () => {
    setLoadingBuy(true);
    setTimeout(() => {
      const result = amount * goldRate;
      setTotalAmount(result.toFixed(2));
      setShowSummary(true);
      setShowUploadSection(false);
      setLoadingBuy(false);
    }, 1000);
  };

  useEffect(() => {
    if (showSummary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showSummary]);

  useEffect(() => {
    if (showUploadSection && uploadRef.current) {
      uploadRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showUploadSection]);

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 100 20v-2a8 8 0 118-8h2A10 10 0 0012 2z"
      />
    </svg>
  );

  const handlesubmit = async () => {
    if (!utrId) {
      alert("Please upload screenshot and enter UTR ID.");
      return;
    }

    const email = localStorage.getItem("userEmail");

    try {
      const currentDate = new Date().toISOString();

      await TransactionHistory({
        TransactionID: utrId,
        TransactionAmt: totalAmount,
        TransactionPurpose: "Buy Gold Coin",
        TransactionType: "Credit",
        Status: "Pending",
        TDate: currentDate,
        Accountnumber: "0000000000", // 🔁 Replace with real account if available
        IFSC: "IFSC000000", // 🔁 Replace with actual IFSC
        Branch: "VKT Digital Branch",
        Email: email,
      });

      alert("Transaction submitted successfully!");
      setShowUploadSection(false);
      setShowSummary(false);
      setUtrId("");
      setScreenshot(null);
    } catch (err) {
      console.error(err);
      alert("Failed to submit transaction.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 animate-slide-bounce">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap transition-all duration-300 md:mt-[40px]">
        {/* Input Card */}
        <div className="bg-blue-100 p-6 rounded-3xl shadow-xl w-full max-w-[400px] mx-auto md:mx-0 text-center min-h-[600px] flex flex-col justify-between">
          <div>
            <h2 className="text-[30px] font-bold text-blue-800 mb-6">
              Buy Gold Coins
            </h2>

            <div className="flex justify-center items-center gap-2 mb-5">
              <span className="text-[25px] font-medium">Number of Coins</span>
            </div>

            <div className="text-5xl font-bold mb-2">
              <input
                type="number"
                min="10"
                value={amount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 10) {
                    setAmount(value);
                  } else {
                    alert("Minimum 10 coins required to proceed.");
                    setAmount(10);
                  }
                }}
                className="text-center text-[30px] text-gray-700 bg-white border border-gray-300 rounded-md px-2 py-1 w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="text-sm text-gray-500 flex justify-center items-center gap-1 mb-4">
              <span>Rate: ₹{goldRate} per coin</span>
              <FiRefreshCcw />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300 text-white py-3 rounded-full font-semibold text-lg"
                >
                  {amt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl mb-6">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-400 text-white p-2 rounded-full">
                  <FaCoins className="text-2xl" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Buy</p>
                  <p className="text-md font-semibold">Gold Coin</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className={`w-full transition ease-in-out duration-300 text-white py-3 rounded-full font-semibold text-lg ${
                loadingBuy
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loadingBuy}
            >
              {loadingBuy ? (
                <div className="flex justify-center items-center gap-2">
                  <LoadingSpinner />
                  Processing...
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Powered by <span className="font-semibold">VKT Gold Coin</span>
          </p>
        </div>

        {/* Summary Card */}
        {showSummary && (
          <div
            ref={summaryRef}
            className="flex flex-col items-center justify-center bg-blue-100 p-6 rounded-3xl shadow-xl w-full max-w-[400px] mx-auto md:mx-0 animate-slide-bounce min-h-[600px]"
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Purchase Summary
            </h2>
            <div className="text-lg text-gray-800 mb-2">
              You are buying <span className="font-semibold">{amount}</span>{" "}
              Gold Coins
            </div>
            <div className="text-lg text-blue-900 font-bold mb-4">
              Total Amount: ₹{totalAmount}
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md mb-4">
              <QRCode
                value={`upi://pay?pa=9619638549-1@axl&pn=Vishal Kumar&am=${totalAmount}&cu=INR`}
                size={160}
              />
            </div>
            <div className="text-sm text-gray-600 text-center mb-6">
              Thank you for choosing{" "}
              <span className="font-medium">VKT Gold Coin</span>!
              <br />
              Please proceed with payment or reset to change input.
            </div>
            <div className="flex gap-4">
              <button
                className="bg-green-600 hover:bg-green-700 transition duration-300 text-white px-4 py-2 rounded-lg font-semibold"
                onClick={() => {
                  setShowUploadSection(true);
                }}
              >
                Complete Payment
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 transition duration-300 text-white px-4 py-2 rounded-lg font-semibold"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to cancel this purchase?"
                  );
                  if (confirmed) {
                    setAmount(10);
                    setTotalAmount(null);
                    setShowSummary(false);
                    setShowUploadSection(false);
                    setUtrId("");
                    setScreenshot(null);
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Upload Section */}
        {showUploadSection && (
          <div
            ref={uploadRef}
            className="flex flex-col items-center justify-center bg-blue-100 p-6 rounded-3xl shadow-xl w-full max-w-[400px] mx-auto md:mx-0 animate-slide-bounce min-h-[600px]"
          >
            <h2 className="text-xl font-bold text-blue-800 mb-10">
              Payment Confirmation
            </h2>

            <label className="mb-2 text-gray-600 font-medium">
              Upload Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="mb-10"
            />

            <label className="mb-2 text-gray-600 font-medium">
              Enter UTR ID
            </label>
            <input
              type="text"
              value={utrId}
              onChange={(e) => setUtrId(e.target.value)}
              placeholder="e.g., 1234567890UTR"
              className="mb-10 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => handlesubmit()}
              className="mt-10 w-full bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300 text-white py-3 rounded-full font-semibold text-lg"
            >
              Submit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPages;
