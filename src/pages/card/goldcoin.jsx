import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import vktlogo from "../../assets/coin.png";
import CoinsValue from "../../backend/coins/coinsValue";

const GoldCoin = () => {
  const [price, setPrice] = useState(0); // base price
  const [changePercent, setChangePercent] = useState("+0.37%");

  // Generate random percentage (positive or negative)
  const generateRandomChange = () => {
    const sign = Math.random() < 0.5 ? 1 : -1;
    const randomPercent = (Math.random() * 2).toFixed(2); // 0.00 to 2.00
    return sign * parseFloat(randomPercent); // returns -1.23 or 0.85 etc.
  };

  useEffect(() => {
    const fetchCoinValue = async () => {
      try {
        const res = await CoinsValue();
        console.log("API Coin Value Response:", res);

        if (Array.isArray(res) && res.length > 0) {
          const user = res[0];
          setPrice(parseFloat(user.Coinvalue)); // ✅ correct way
        }
      } catch (err) {
        console.error("❌ Failed to fetch Coin value:", err);
      }
    };

    fetchCoinValue();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const percentChange = generateRandomChange();

      // Update percentage string for display
      const sign = percentChange >= 0 ? "+" : "-";
      setChangePercent(`${sign}${Math.abs(percentChange).toFixed(2)}%`);

      // Update the price
      setPrice((prevPrice) => {
        const updatedPrice = prevPrice + (prevPrice * percentChange) / 100;
        return parseFloat(updatedPrice.toFixed(2));
      });
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center bg-inherit">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6 bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-start items-start">
        {/* Icon */}
        <div className="bg-orange-500 rounded-full">
          <img
            src={vktlogo}
            alt="vktlogo"
            className="md:h-[100px] md:w-[100px] w-[70px] h-[70px]"
          />
        </div>

        {/* Title and Price */}
        <div className="text-start mb-4">
          <p className="md:text-[35px] text-[25px] font-semibold">
            VKT Gold Coin
          </p>
          <p className="text-gray-600 text-[20px] md:text-[30px]">₹{price}</p>
        </div>

        {/* Percentage Change */}
        <div
          className={`flex items-center text-[25px] md:text-[40px] font-medium ${
            changePercent.startsWith("+") ? "text-green-600" : "text-red-500"
          }`}
        >
          <FaArrowUp className="mr-1" />
          {changePercent}
        </div>
      </div>
    </div>
  );
};

export default GoldCoin;
