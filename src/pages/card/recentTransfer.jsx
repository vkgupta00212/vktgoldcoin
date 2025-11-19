import React, { useEffect, useState } from "react";
import CoinsShow from "../../backend/coins/coinsShow";
import TransactionHistoryShow from "../../backend/transactionHistory/transactionHistoryShow";
import { useSharedCoinValue } from "../../backend/coins/liveprice";

const CoinSummary = () => {
  const Email = localStorage.getItem("userEmail");
  const [totalcoins, setTotalcoins] = useState({});
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [gst, setGst] = useState(33); // still showing GST just for display
  const [profitLoss, setProfitLoss] = useState(0);

  const { coinValue, changePercent } = useSharedCoinValue();

  useEffect(() => {
    const fetchCoinsDetails = async () => {
      try {
        const res = await CoinsShow(Email);
        if (res && res.Coin?.length > 0) setTotalcoins(res.Coin[0]);
      } catch (error) {
        console.error("❌ Error fetching user coin details:", error);
      }
    };
    fetchCoinsDetails();
  }, [Email]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const res = await TransactionHistoryShow(Email);
        if (Array.isArray(res) && res.length > 0) {
          const latest = res[res.length - 1];
          setLatestTransaction(latest);
        } else {
          setLatestTransaction(null);
        }
      } catch (err) {
        console.error("❌ Error loading transaction history:", err);
      }
    };
    fetchTransactionData();
  }, [Email]);

  // ✅ PROFIT CALCULATION WITH 33% GST REMOVED
  useEffect(() => {
    if (latestTransaction && totalcoins?.Coin && coinValue) {
      const totalCoins = parseFloat(totalcoins.Coin) || 0;
      const currentPrice = parseFloat(coinValue) || 0;
      const buyingPrice = parseFloat(latestTransaction.TransactionAmt) || 0;

      const totalValue = currentPrice * totalCoins;

      // ✔ Removing 33% GST → taking 67% of the profit
      let profit;

      if (totalValue >= buyingPrice) {
        // Profit → deduct 33% GST
        profit = (totalValue - buyingPrice) * 0.67;
      } else {
        // Loss → do NOT deduct GST
        profit = totalValue - buyingPrice;
      }

      setProfitLoss(profit.toFixed(2));
    }
  }, [latestTransaction, totalcoins, coinValue]);

  const isProfit = parseFloat(profitLoss) >= 0;

  return (
    <div className="flex justify-center items-center bg-blue-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-[90%] md:w-[500px]">
        <h2 className="text-center text-[16px] md:text-[24px] font-semibold mb-6">
          Investment Summary
        </h2>

        <table className="w-full border-collapse text-[12px] md:text-[18px]">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="font-semibold py-2 px-4">Total Coins</td>
              <td className="py-2 px-4 text-right">{totalcoins.Coin || 0}</td>
            </tr>

            <tr className="border-b border-gray-300 bg-blue-50">
              <td className="font-semibold py-2 px-4">
                Buying Price (per coin)
              </td>
              <td className="py-2 px-4 text-right">
                ₹
                {latestTransaction && totalcoins?.Coin
                  ? (
                      latestTransaction.TransactionAmt / totalcoins.Coin
                    ).toFixed(2)
                  : 0}
              </td>
            </tr>

            {/* Current Price Live */}
            <tr className="border-b border-gray-300">
              <td className="font-semibold py-2 px-4">Current Price</td>
              <td className="py-2 px-4 text-right">
                ₹{coinValue.toFixed(2)}{" "}
                <span
                  className={`ml-2 ${
                    changePercent.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  } text-sm`}
                >
                  {changePercent}
                </span>
              </td>
            </tr>

            <tr className="border-b border-gray-300 bg-blue-50">
              <td className="font-semibold py-2 px-4">GST (33%)</td>
              <td className="py-2 px-4 text-right">{gst}%</td>
            </tr>

            <tr>
              <td className="font-semibold py-2 px-4">Total Profit/Loss</td>
              <td
                className={`py-2 px-4 text-right font-semibold ${
                  isProfit ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{profitLoss}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinSummary;
