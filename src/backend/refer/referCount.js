import axios from "axios";

const  ReferCount = async (ReferCode)=>{
    const formData =  new URLSearchParams();
    formData.append("token", "ALJDFHAGEJJJKL");
    formData.append("reffer", ReferCode);

    try{
        const response = await axios.post("https://vkt.anklegaming.live/APIs/APIs.asmx/ShowrefferCount",
            formData,
                {
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
        );
        console.log("Refer count API Response",response.data);
        return response.data;

    } catch (error) {
    console.error("❌ API error:", error.message);
    throw new Error("Registration failed. Please try again.");
  }
    


}

export default ReferCount;