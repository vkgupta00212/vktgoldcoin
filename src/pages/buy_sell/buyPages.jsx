import React, { useState, useEffect, useRef } from "react";
import { FaCoins } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import QRCode from "react-qr-code";
import TransactionHistory from "../../backend/transactionHistory/transactionHistory.js";
import bankDetailshShowAPI from "../../backend/bank/bankDetailsh.js";
import AdressShowAPI from "../../backend/adress/AdressShowAPI.js";
import CoinsValue from "../../backend/coins/coinsValue.js";

const BuyPages = () => {
  const [amount, setAmount] = useState(10);
  const [totalAmount, setTotalAmount] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [hasBankDetails, setHasBankDetails] = useState(false);
  const [hasAdressDetailsh, setHasAdressDetailsh] = useState(false);
  const [goldRate, setGoldRate] = useState(0); // ✅ use state
  const presetAmounts = [5, 10, 15, 20];
  const summaryRef = useRef(null);
  const uploadRef = useRef(null);

  const email = localStorage.getItem("userEmail");

  const handleContinue = () => {
    if (amount < 5) {
      alert("You must buy atleast 10 Coins to proceed");
      return;
    }

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
    const fetchCoinValue = async () => {
      try {
        const res = await CoinsValue();
        console.log("API Coin Value Response:", res);

        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          setGoldRate(parseFloat(user.Coinvalue)); // ✅ correct way
        }
      } catch (err) {
        console.error("❌ Failed to fetch Coin value:", err);
      }
    };

    fetchCoinValue();
  }, []);

  useEffect(() => {
    const fetchAdressDetailsh = async () => {
      try {
        const res = await AdressShowAPI(email);
        console.log("API Adress Response:", res); // full array

        // ✅ Check correct fields based on actual response
        if (
          Array.isArray(res) &&
          res.length > 0 &&
          res[0].AddressLine2 &&
          res[0].City &&
          res[0].State &&
          res[0].Pincode &&
          res[0].Country
        ) {
          setHasAdressDetailsh(true);
          console.log("✅ Address details found:", res[0]);
        } else {
          setHasAdressDetailsh(false);
          console.warn("⚠️ Incomplete or missing Address details.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch Address details:", err);
        setHasAdressDetailsh(false);
      }
    };

    fetchAdressDetailsh();
  }, []);

  useEffect(() => {
    const fetchBankDetailsh = async () => {
      try {
        const res = await bankDetailshShowAPI(email);
        console.log("API Bank Response:", res); // full array

        // Check if array and has required fields in first item
        if (
          Array.isArray(res) &&
          res.length > 0 &&
          res[0].Accountnumber &&
          res[0].IFSC &&
          res[0].Branch &&
          res[0].Accountholder
        ) {
          setHasBankDetails(true);
          console.log("✅ Bank details found:", res[0]);
        } else {
          setHasBankDetails(false);
          console.warn("⚠️ Incomplete or missing bank details.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch bank details:", err);
        setHasBankDetails(false);
      }
    };

    fetchBankDetailsh(); // ✅ fixed function name
  }, []);

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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // remove MIME prefix
        resolve(base64);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handlesubmit = async () => {
    const currentDate = new Date().toISOString();

    // ✅ Step 1: Validate required details
    if (!hasBankDetails) {
      alert("❌ Please add your bank details first.");
      return;
    }

    if (!hasAdressDetailsh) {
      alert("❌ Please add your address details first.");
      return;
    }

    if (!screenshot) {
      alert("❌ Please upload a screenshot of payment.");
      return;
    }

    try {
      // ✅ Step 2: Convert image to base64
      const imageBase64 = await convertToBase64(screenshot);

      // ✅ Step 3: Check image size in KB (optional)
      const imageSizeInKB = (imageBase64.length * 3) / 4 / 1024;
      console.log(`📦 Base64 image size: ${imageSizeInKB.toFixed(2)} KB`);

      if (imageSizeInKB > 2000) {
        // ~2MB safety limit
        alert("❌ Screenshot is too large. Please upload an image under 2MB.");
        return;
      }

      // ✅ Step 4: Call Transaction API
      const response = await TransactionHistory(
        totalAmount, // TransactionAmt
        "Buy Gold Coin", // TransactionPurpose
        "Buy", // TransactionType
        "Pending", // Status
        currentDate, // TDate
        "0", // Accountnumber (placeholder)
        "IFSC", // IFSC (placeholder)
        "VKT Digital Branch", // Branch (placeholder)
        imageBase64, // Timages (base64 string)
        amount, // Coin
        email // Email
      );

      console.log("✅ Transaction API Success:", response);

      // ✅ Step 5: Reset UI and show success
      alert("✅ Transaction submitted successfully!");
      setShowUploadSection(false);
      setShowSummary(false);
      setScreenshot(null);
    } catch (err) {
      console.error("❌ Transaction submit error:", err.message || err);
      alert("❌ Failed to submit transaction. Please try again.");
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
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
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
                value={`upi://pay?pa=turkavenkatakrishna@okaxis&pn=Vishal Kumar&am=${totalAmount}&cu=INR`}
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
