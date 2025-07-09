import axios from "axios";

const updateUserDetailsh = async (
  Name,
  Email,
  Phone,
) => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Name", Name);
  formData.append("Phone", Phone);
  formData.append("Email", Email);


  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/UpdateProfiles",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const res = response.data;
    console.log(res);
    return res;
  } catch (error) {
    console.error("❌ API error:", error.message);
    throw new Error("Update user details failed. Please try again.");
  }
};

export default updateUserDetailsh;
