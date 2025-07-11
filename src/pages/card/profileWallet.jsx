import { div } from "framer-motion/client";
import react, { useState, useEffect } from "react";
import coinBag from "../../assets/coin_bag.png";
import CoinsShow from "../../backend/coins/coinsShow";

const profileWallet = () => {
  const Email = localStorage.getItem("userEmail");
  const [coins, setCoins] = useState({});

  useEffect(() => {
    const fetchCoinsDetails = async () => {
      try {
        const res = await CoinsShow(Email);
        console.log("profile Wallet API Response:", res);

        // ✅ Adjust according to correct structure
        if (
          res &&
          res.Coin &&
          Array.isArray(res.Coin) &&
          res.Coin.length > 0 &&
          res.Coin[0].Coin !== undefined
        ) {
          setCoins({
            coins: res.Coin[0].Coin,
          });
        } else {
          console.warn("⚠️ No valid Coin data found in response.");
        }
      } catch (error) {
        console.error("Error fetching user coin details:", error);
      }
    };

    fetchCoinsDetails();
  }, []);

  return (
    <div className="bg-inherit text-center py-8">
      <div className="w-[300px] md:w-[500px] md:h-[300px] p-6  bg-white rounded-2xl shadow-md text-gray-800 flex flex-col justify-center items-center ">
        <div className="flex justify-center mb-6">
          <img
            src={coinBag}
            alt="Coin Bag"
            className="md:w-[150px] md:h-[150px] h-[100px] w-[100px] object-contain "
          />
        </div>
        <div className="text-center flex flex-col items-center">
          <h2 className="md:text-[28px] text-[25px] font-bold">Total Coin</h2>
          <p className="text-[23px] mt-2">{coins.coins || "0"}</p>
        </div>
      </div>
    </div>
  );
};

export default profileWallet;
