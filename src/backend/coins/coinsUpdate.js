import axios from "axios";

const CoinsUpdate = async (action,Coins,Email)=>{
    const formData = new URLSearchParams();
    formData.append("token", "ALJDFHAGEJJJKL");
    formData.append("action", action)
    formData.append("Coin",Coins)
    formData.append("Email", Email);

    try{
        const response = await axios.post("https://vkt.anklegaming.live/APIs/APIs.asmx/UpdatesCoin",
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
export default CoinsUpdate; 