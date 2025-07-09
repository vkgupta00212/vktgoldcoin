import axios from "axios";

const TransactionHistoryShow =async (Email)=>{
    const formData = new URLSearchParams();
    formData.append("token", "ALJDFHAGEJJJKL");
    formData.append("Email",Email);

    try{
        const response = await axios.post("https://vkt.anklegaming.live/APIs/APIs.asmx/ShowTransactionHis",
            formData,
            {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
    }

}
export default TransactionHistoryShow;