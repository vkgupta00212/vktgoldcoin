import axios from "axios";

// ✅ Define model with a static fromJSON factory method
class CoinValueModel {
  constructor(ID, Coinvalue) {
    this.ID = ID;
    this.Coinvalue = parseFloat(Coinvalue);
  }

  // ✅ Converts raw API JSON into a CoinValueModel instance
  static fromJSON(json) {
    return new CoinValueModel(json.ID || "", json.Coinvalue || 0);
  }
}

// ✅ Fetch API and map data into CoinValueModel instances
const CoinsValue = async () => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/ShowCoinValues",
      formData
    );

    let jsonData = response.data;

    // 🧩 Handle both string or object responses
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }

    // ✅ Convert each item to a CoinValueModel
    const coinValues = jsonData.map((item) => CoinValueModel.fromJSON(item));

    return coinValues;
  } catch (error) {
    console.error("❌ Error fetching Coin Value:", error);
    return [];
  }
};

export default CoinsValue;
