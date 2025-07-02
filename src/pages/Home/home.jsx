import React from "react";
import ProfileCard from "../card/profileCard.jsx";
import DashBoardDetailsh from "../card/dashboardDetailsh.jsx";
import ButtonBuySell from "../card/button_buy_sell.jsx";
import GoldCoin from "../card/goldcoin.jsx";
import ProfileWallet from "../card/profileWallet.jsx";

const Home = ({ setSelectedPage }) => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-10 animate-slide-bounce">
      {/* Profile Section */}
      <div className="bg-gray-200 flex-col rounded-[15px] mt-6 p-4 md:p-8 md:w-full mx-auto">
        <section className="flex flex-col md:flex-row md:gap-6 items-center justify-center">
          <ProfileCard setSelectedPage={setSelectedPage} />
          <ProfileWallet />
        </section>
      </div>

      {/* GoldCoin + Buy/Sell Section */}
      <div className="bg-gray-200 rounded-[15px] mt-6 p-4 md:p-8 md:w-full mx-auto">
        <section className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <GoldCoin />
          <ButtonBuySell />
        </section>
      </div>

      {/* Dashboard Details */}
      <div className="bg-gray-200 rounded-[15px] mt-6 p-4 md:p-8 md:w-full  mx-auto">
        <section>
          <DashBoardDetailsh />
        </section>
      </div>
    </div>
  );
};

export default Home;
