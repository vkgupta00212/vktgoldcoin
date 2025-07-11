// backend/coin/CoinsInsert.js
import axios from "axios";

const CoinsInsert = async (coin, email) => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Coin", coin);     // correct case and param
  formData.append("Email", email);

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/AddCoin",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("✅ Coins inserted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Coin insert error:", error.message);
    throw new Error("Coin insert failed. Please try again.");
  }
};

export default CoinsInsert;
