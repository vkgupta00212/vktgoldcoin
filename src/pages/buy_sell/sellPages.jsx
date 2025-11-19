import React, { useState, useEffect, useRef } from "react";
import { FaCoins } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import TransactionHistory from "../../backend/transactionHistory/transactionHistory.js";
import getCustomerData from "../../backend/detailsh/getCustomerData.js";
import bankDetailshShowAPI from "../../backend/bank/bankDetailsh.js";
import CoinsValue from "../../backend/coins/coinsValue.js";
import CoinsUpdate from "../../backend/coins/coinsUpdate.js";
import { useNavigate } from "react-router-dom";

const SellPages = () => {
  const [amount, setAmount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [utrId, setUtrId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [hasBankDetails, setHasBankDetails] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const [userDetailsh, setUserDetailsh] = useState();
  const [goldRate, setGoldRate] = useState(0);
  const presetAmounts = [5, 10, 15, 20];

  const summaryRef = useRef(null);
  const uploadRef = useRef(null);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (amount < 1) {
      alert("You must sell at least 1 coin to proceed");
      return;
    }
    setLoadingBuy(true);
    setTimeout(() => {
      const result = amount * goldRate;
      setTotalAmount(result.toFixed(2));
      setShowSummary(true);
      setShowUploadSection(false);
      setLoadingBuy(false);
    }, 800);
  };

  // fetch current coin/gold rate
  useEffect(() => {
    const fetchCoinValue = async () => {
      try {
        const res = await CoinsValue();
        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          setGoldRate(parseFloat(user.Coinvalue) || 0);
        }
      } catch (err) {
        console.error("Failed to fetch coin value:", err);
      }
    };
    fetchCoinValue();
  }, []);

  // fetch bank details for this user and normalize
  useEffect(() => {
    const fetchBankDetailsh = async () => {
      try {
        if (!email) {
          setHasBankDetails(false);
          return;
        }
        const res = await bankDetailshShowAPI(email);
        // res might be an array or object or model instance
        let record = null;
        if (Array.isArray(res) && res.length > 0) record = res[0];
        else if (res && typeof res === "object") record = res;

        if (
          record &&
          (record.Accountnumber || record.accountNumber) &&
          (record.IFSC || record.ifsc) &&
          (record.Branch || record.branch) &&
          (record.Accountholder ||
            record.accountHolder ||
            record.Accountholder === "")
        ) {
          const normalized = {
            accountNumber: record.Accountnumber ?? record.accountNumber ?? "",
            ifsc: record.IFSC ?? record.ifsc ?? "",
            branch: record.Branch ?? record.branch ?? "",
            accountHolder:
              record.Accountholder ??
              record.accountHolder ??
              record.Accountholder ??
              "",
            bankName: record.BankName ?? record.bankName ?? "",
            phone: record.Phone ?? record.phone ?? "",
            email: record.Email ?? record.email ?? "",
          };
          setBankDetails(normalized);
          setHasBankDetails(true);
          console.log("Bank details loaded:", normalized);
        } else {
          setHasBankDetails(false);
          setBankDetails(null);
          console.warn("No complete bank details found.");
        }
      } catch (err) {
        console.error("Failed to fetch bank details:", err);
        setHasBankDetails(false);
        setBankDetails(null);
      }
    };

    fetchBankDetailsh();
  }, [email]);

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

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1] || "";
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  // submit: use fetched bank details instead of hard-coded values
  const handlesubmit = async () => {
    const currentDate = new Date().toISOString();

    if (!hasBankDetails || !bankDetails) {
      alert("First add bank details");
      return;
    }

    if (!userDetailsh || utrId !== userDetailsh.password) {
      alert("Incorrect Password. Please try again.");
      return;
    }

    try {
      let imageBase64 = "";
      if (screenshot) {
        imageBase64 = await convertToBase64(screenshot);
      }

      // Use bankDetails values here
      await TransactionHistory(
        totalAmount,
        "Sell Gold Coin",
        "Sell",
        "Pending",
        currentDate,
        bankDetails.accountNumber,
        bankDetails.ifsc,
        bankDetails.branch,
        imageBase64,
        amount,
        email
      );

      await CoinsUpdate("sell", amount, email);

      alert("✅ Coins sold successfully");
    } catch (err) {
      console.error("Transaction submit error:", err);
      alert("❌ Failed to submit transaction.");
    } finally {
      setShowUploadSection(false);
      setShowSummary(false);
      setUtrId("");
      setScreenshot(null);
      navigate("/");
    }
  };

  // fetch user password for verification
  useEffect(() => {
    const fetchPassword = async () => {
      try {
        if (!email) return;
        const res = await getCustomerData(email);
        if (Array.isArray(res) && res.length > 0 && res[0].Password) {
          setUserDetailsh({ password: res[0].Password });
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchPassword();
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 animate-slide-bounce">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap transition-all duration-300 md:mt-[40px]">
        {/* Input Card */}
        <div className="bg-blue-100 p-6 rounded-3xl shadow-xl w-full max-w-[400px] mx-auto md:mx-0 text-center min-h-[600px] flex flex-col justify-between">
          <div>
            <h2 className="text-[30px] font-bold text-blue-800 mb-6">
              Sell Gold Coins
            </h2>

            <div className="flex justify-center items-center gap-2 mb-5">
              <span className="text-[25px] font-medium">Number of Coins</span>
            </div>

            <div className="text-5xl font-bold mb-2">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
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
                  <p className="text-sm text-gray-500">Sell</p>
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
              Sell Summary
            </h2>
            <div className="text-lg text-gray-800 mb-2">
              You are selling <span className="font-semibold">{amount}</span>{" "}
              Gold Coins
            </div>
            <div className="text-lg text-blue-900 font-bold mb-4">
              Total Amount: ₹{totalAmount}
            </div>

            <div className="text-sm text-gray-600 text-center mb-6">
              Thank you for choosing{" "}
              <span className="font-medium">VKT Gold Coin</span>!
              <br />
              Please Confirm to sell Coin.
            </div>
            <div className="flex gap-4">
              <button
                className="bg-green-600 hover:bg-green-700 transition duration-300 text-white px-4 py-2 rounded-lg font-semibold"
                onClick={() => setShowUploadSection(true)}
              >
                Sell Coin
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
              Sell Confirmation
            </h2>

            <label className="mb-2 text-gray-600 font-medium">
              Enter your account PassWord
            </label>
            <input
              type="text"
              value={utrId}
              onChange={(e) => setUtrId(e.target.value)}
              placeholder="Account Password"
              className="mb-10 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="mb-2 text-gray-600 font-medium">
              Upload Screenshot (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
              className="mb-6"
            />

            <button
              onClick={() => handlesubmit()}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300 text-white py-3 rounded-full font-semibold text-lg"
            >
              Submit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellPages;
