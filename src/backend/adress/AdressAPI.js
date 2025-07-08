import axios from "axios";

const AdressAPI = async (
  Addresstype,
  AddressLine1,
  AddressLine2,
  City,
  State,
  Country,
  Pincode,
  Phone,
  Email
) => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Addresstype", Addresstype);
  formData.append("AddressLine1", AddressLine1);
  formData.append("AddressLine2", AddressLine2);
  formData.append("City", City);
  formData.append("State", State);
  formData.append("Country", Country);
  formData.append("Pincode", Pincode);
  formData.append("Phone", Phone);
  formData.append("Email", Email);

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/Addresss",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("✅ API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API error:", error.message);
    throw new Error("Address insertion failed. Please try again.");
  }
};

export default AdressAPI;
