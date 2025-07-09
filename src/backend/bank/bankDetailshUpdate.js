import axios from "axios";

const UpdateBankDetails = async (
  Accountnumber,
  IFSC,
  Branch,
  Accountholder,
  BankName,
  Phone,
  Email,
) =>{

    const formData = new URLSearchParams();
  formData.append("token", "ALJDFHAGEJJJKL");
  formData.append("Accountnumber", Accountnumber);
  formData.append("IFSC", IFSC);
  formData.append("Branch", Branch);
  formData.append("Accountholder", Accountholder);
  formData.append("BankName", BankName);
  formData.append("Phone", Phone);
  formData.append("Email", Email);

 try{
    const response = await axios.post(
        "https://vkt.anklegaming.live/APIs/APIs.asmx/UpdateBankAcc",
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    console.log(response.data);
    return response.data;

 }catch{
    console.log("Error in bank details update");
 }
}

export default UpdateBankDetails;