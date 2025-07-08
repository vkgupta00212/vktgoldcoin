import axios from "axios";

const loginAPI = async (email, password) => {
  const formData = new URLSearchParams(); // ✅ FIXED: Typo was here
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Email", email);        // ✅ FIXED: use correct parameter names
  formData.append("Password", password);

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/Logins",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // ✅ FIXED: capitalize properly
        },
      }
    );
    return response.data; // should return JSON or array from API
  } catch (error) {
    console.error("❌ Error in loginAPI:", error);
    throw new Error("Login failed. Please try again.");
  }
};

export default loginAPI;
