import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHistoryShow from "../../backend/transactionHistory/transactionHistoryShow";
import CoinsShow from "../../backend/coins/coinsShow";

const GoldCoin = () => {
  const [canSell, setCanSell] = useState(false);
  const [coins, setCoins] = useState(0); // ✅ fixed: no `new` keyword
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const buyNavigate = () => {
    navigate("/buycoin");
  };

  const sellNavigate = () => {
    navigate("/sellcoin");
  };

  // useEffect(() => {
  //   const checkSellEligibility = async () => {
  //     try {
  //       // Step 1: Check current coin value
  //       // Step 1: Check current coin value
  //       const coinRes = await CoinsShow(email);
  //       console.log("CoinsShow API response:", coinRes);

  //       if (
  //         coinRes?.Coin &&
  //         Array.isArray(coinRes.Coin) &&
  //         coinRes.Coin.length > 0
  //       ) {
  //         const totalCoins = parseFloat(coinRes.Coin[0].Coin) || 0;
  //         setCoins(totalCoins);
  //       } else {
  //         setCoins(0);
  //       }

  //       // Step 2: Check transaction history for 6-month hold
  //       const res = await TransactionHistoryShow(email);
  //       const purchases = res?.filter((tx) => tx.Type === "Buy" && tx.date);

  //       if (!purchases || purchases.length === 0) {
  //         setCanSell(false);
  //         return;
  //       }

  //       const now = new Date();
  //       const isEligible = purchases.some((tx) => {
  //         const purchaseDate = new Date(tx.date);
  //         const sixMonthsLater = new Date(purchaseDate);
  //         sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  //         return now >= sixMonthsLater;
  //       });

  //       setCanSell(isEligible);
  //     } catch (error) {
  //       console.error("Error checking sell eligibility:", error);
  //       setCanSell(false);
  //     }
  //   };

  //   checkSellEligibility();
  // }, []);

  return (
    <div className="flex justify-center items-center bg-inherit">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center">
        <h2 className="text-[22px] md:text-[27px] text-[#000] font-medium">
          Buy & Sell
        </h2>

        <div className="justify-center flex flex-col gap-4 mt-6">
          <div className="mt-6 flex flex-col">
            {/* Buy Button */}
            <div className="w-[200px] mb-6 text-[15px] md:text-[20px]">
              <button
                type="button"
                onClick={buyNavigate}
                className="w-full font-semibold py-2 rounded-[25px] shadow transition-transform duration-100 ease-in-out flex justify-center items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                Buy
              </button>
            </div>

            {/* Sell Button */}
            <div className="w-[200px] text-[15px] md:text-[20px]">
              <button
                type="button"
                onClick={() => {
                  if (coins <= 0) {
                    alert("⚠️ First buy coin before selling.");
                    return;
                  } else {
                    navigate("/sellcoin");
                  }
                }}
                className={`w-full font-semibold py-2 rounded-[25px] shadow transition-transform duration-100 ease-in-out flex justify-center items-center gap-2 text-white bg-red-600 hover:bg-red-700 `}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldCoin;
