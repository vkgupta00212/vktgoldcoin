import axios from "axios";
import { parseStringPromise } from "xml2js";

const getCustomerData = async (Email) => {
  const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Email", Email);

  try {
    const response = await axios.post(
      "https://vkt.anklegaming.live/APIs/APIs.asmx/ShowUsers",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
   
    const result = await (response.data);
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export default getCustomerData;
