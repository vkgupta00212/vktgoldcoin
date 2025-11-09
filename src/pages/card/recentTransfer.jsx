import React, { useEffect, useState } from "react";
import CoinsShow from "../../backend/coins/coinsShow";
import CoinsValue from "../../backend/coins/coinsValue";
import TransactionHistoryShow from "../../backend/transactionHistory/transactionHistoryShow";

const CoinSummary = () => {
  const Email = localStorage.getItem("userEmail");
  const [totalcoins, setTotalcoins] = useState({});
  const [price, setPrice] = useState(0);
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [gst, setGst] = useState(33);
  const [profitLoss, setProfitLoss] = useState(0);

  useEffect(() => {
    const fetchCoinsDetails = async () => {
      try {
        const res = await CoinsShow(Email);
        console.log("profile Wallet API Response:", res);
        setTotalcoins(res.Coin[0]);
      } catch (error) {
        console.error("Error fetching user coin details:", error);
      }
    };
    fetchCoinsDetails();
  }, [Email]);

  useEffect(() => {
    const fetchCoinValue = async () => {
      try {
        const res = await CoinsValue();
        console.log("API Coin Value Response:", res);
        if (Array.isArray(res) && res.length > 0) {
          setPrice(res[0].Coinvalue);
        }
      } catch (err) {
        console.error("❌ Failed to fetch Coin value:", err);
      }
    };
    fetchCoinValue();
  }, []);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const res = await TransactionHistoryShow(Email);
        if (Array.isArray(res) && res.length > 0) {
          const latest = res[res.length - 1];
          setLatestTransaction(latest);
          console.log("✅ Latest Transaction:", latest);
        } else {
          setLatestTransaction(null);
        }
      } catch (err) {
        console.error("Error loading transaction history:", err);
      }
    };
    fetchTransactionData();
  }, [Email]);

  // ✅ Calculate profit/loss whenever data updates
  useEffect(() => {
    if (latestTransaction && totalcoins?.Coin && price) {
      const totalCoins = parseFloat(totalcoins.Coin) || 0;
      const currentPrice = parseFloat(price) || 0;
      const buyingPrice = parseFloat(latestTransaction.TransactionAmt) || 0;

      const totalValue = currentPrice * totalCoins;
      const profit = totalValue - buyingPrice;

      setProfitLoss(profit.toFixed(2)); // Round to 2 decimals
    }
  }, [latestTransaction, totalcoins, price]);

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
              <td className="font-semibold py-2 px-4">Buying Price</td>
              <td className="py-2 px-4 text-right">
                ₹{latestTransaction?.TransactionAmt || 0}
              </td>
            </tr>

            <tr className="border-b border-gray-300">
              <td className="font-semibold py-2 px-4">Current Price</td>
              <td className="py-2 px-4 text-right">₹{price}</td>
            </tr>

            <tr className="border-b border-gray-300 bg-blue-50">
              <td className="font-semibold py-2 px-4">GST (33%)</td>
              <td className="py-2 px-4 text-right">{gst}%</td>
            </tr>

            <tr>
              <td className="font-semibold py-2 px-4">Total Profit/Loss</td>
              <td
                className={`py-2 px-4 text-right font-semibold ${
                  profitLoss >= 0 ? "text-green-600" : "text-red-600"
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
