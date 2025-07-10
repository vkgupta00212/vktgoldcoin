import { div } from "framer-motion/client";
import react, { useState, useEffect } from "react";
import coinBag from "../../assets/coin_bag.png";
import TransferHistoryShow from "../../backend/transactionHistory/transactionHistoryShow.js";

const profileWallet = () => {
  const Email = localStorage.getItem("userEmail");
  const [coins, setCoins] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await TransferHistoryShow(Email);
        console.log("profile Wallet API Response:", res);

        if (Array.isArray(res) && res.length > 0) {
          let n = res.length;
          const user = res[n - 1];
          setCoins({
            coins: user.Coin,
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
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
