import axios from "axios";
import { form } from "framer-motion/client";

const bankDetailshShowAPI = async (Email)=>{
    const formData = new URLSearchParams();
    formData.append("token", "ALJDFHAGEJJJKL");
    formData.append("Email", Email);

    try{
        const response =  await axios.post(
            "https://vkt.anklegaming.live/APIs/APIs.asmx/ShowBankAccount",
            formData,
            {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            }
        );
        const res = response.data;
        return res;
    }catch{
        console.error("API Error:", error);
        return null;
    }
}
export default bankDetailshShowAPI;