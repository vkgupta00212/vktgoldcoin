import React from "react";
import VenkataImage from "../../assets/venkata_image.png";

const AboutUs = () => {
  return (
    <div className="bg-gray-200 rounded-[15px] m-6 p-2 md:p-8 md:w-full mx-auto animate-slide-bounce">
      <div className="flex flex-col justify-center mb-4">
        <div className="flex justify-center">
          <img
            src={VenkataImage}
            alt="Venkata Image"
            className="md:h-[500px] md:w-[500px] h-[300px] w-[300px] rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center mt-4">
            Venkata Krishna turka
          </h1>
          <p className="text-center text-[20px] text-gray-600 mt-2">
            Founder of VKT Gold Coin
          </p>
        </div>
      </div>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 text-[20px] leading-7">
          Welcome to VKT Gold Coin — A New Era of Digital Gold Trading! At VKT
          Gold Coin, we are redefining the way you invest in gold by blending
          the timeless value of gold with the power of modern technology and
          community growth. Our platform allows users to buy digital gold coins
          that increase or decrease in value based on market trends, similar to
          how cryptocurrencies like Bitcoin behave — but backed by the strength
          of gold. We believe in accessibility, transparency, and innovation.
          With a minimum purchase of just 10 coins, anyone can start their
          journey into digital gold ownership. Whether you’re an investor, a
          collector, or someone looking to build wealth steadily, VKT Gold Coin
          provides a trusted platform to grow your assets. But we’re more than
          just a trading platform — we’re a community. That’s why we’ve
          introduced our powerful referral reward system. When you refer 200
          people, you’ll unlock a special surprise reward as a thank-you for
          helping us grow the VKT family.
        </p>

        <h1 className="text-2xl font-bold mt-10">Why VKT Gold Coin?</h1>
        <ul className="list-disc list-inside text-gray-700 text-[20px] leading-7 mt-2">
          <li>Secure and transparent digital gold trading</li>
          <li>Minimum purchase of just 10 coins</li>
          <li>Referral rewards to grow our community</li>
          <li>Backed by the timeless value of gold</li>
          <li>Accessible to everyone, everywhere</li>
          <li>Innovative platform for modern investors</li>
        </ul>
      </div>
    </div>
  );
};
export default AboutUs;
