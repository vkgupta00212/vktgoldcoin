import axios from "axios";

const registerAPI = async (
  Name,
  Email,
  Password,
  Gender,
  Dob,
  Phone,
  AadharCard,
  PenCard,
  ReferFriend
) => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Name", Name);
  formData.append("Email", Email);
  formData.append("Password", Password);
  formData.append("Gender", Gender);
  formData.append("Dob", Dob);
  formData.append("Phone", Phone);
  formData.append("AadharCard", AadharCard);
  formData.append("PenCard", PenCard);
  formData.append("RefferFriend", ReferFriend); // ✅ match your backend key

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/RegisterUser",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ API error:", error.message);
    throw new Error("Registration failed. Please try again.");
  }
};
export default registerAPI;