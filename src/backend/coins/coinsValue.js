import axios from "axios";

const CoinsValue = async ()=>{
    const formData = new URLSearchParams();
    formData.append("token", "ALJDFHAGEJJJKL");

    try{
        const response = await axios.post("https://vkt.anklegaming.live/APIs/APIs.asmx/ShowCoinValues",
            formData,
            {
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        console.log(response.data);
        return response.data;
    }catch (error) {
    console.error("❌ API error:", error.message);
    throw new Error("Registration failed. Please try again.");
  }

}
export default CoinsValue; 