// ✅ Simple Bank Details Model
class BankDetailsModel {
  constructor(data) {
    this.id = data.id || null;
    this.accountNumber = data.Accountnumber || "";
    this.ifsc = data.IFSC || "";
    this.branch = data.Branch || "";
    this.accountHolder = data.Accountholder || "";
    this.bankName = data.BankName || "";
    this.phone = data.Phone || "";
    this.email = data.Email || "";
  }
}

// ✅ Simplest API function
import axios from "axios";

const bankDetailshShowAPI = async (Email) => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Email", Email);

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/ShowBankAccount",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let res = response.data;

    // 🧹 Clean XML-wrapped string → extract JSON array
    if (typeof res === "string") {
      const jsonMatch = res.match(/\[.*\]/);
      if (jsonMatch) {
        res = JSON.parse(jsonMatch[0]);
      } else {
        return null;
      }
    }

    // Return first bank record as model
    if (Array.isArray(res) && res.length > 0) {
      return new BankDetailsModel(res[0]);
    }

    return null;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export default bankDetailshShowAPI;
export { BankDetailsModel };
