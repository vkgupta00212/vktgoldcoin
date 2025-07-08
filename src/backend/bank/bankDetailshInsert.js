import axios from "axios";

const BankDetailshInsert = async (
  Accountnumber,
  IFSC,
  Branch,
  Accountholder,
  BankName,
  Phone,
  Email,
) => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Accountnumber", Accountnumber);
  formData.append("IFSC", IFSC);
  formData.append("Branch", Branch);
  formData.append("Accountholder", Accountholder);
  formData.append("BankName", BankName);
  formData.append("Phone", Phone);
  formData.append("Email", Email);

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/BankAccounts",
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
    throw new Error("Registration failed. Please try again.");
  }
};

export default BankDetailshInsert;
