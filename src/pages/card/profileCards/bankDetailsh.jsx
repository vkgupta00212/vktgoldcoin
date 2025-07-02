import React from "react";
const BankDetailsh = () => {
  const stats = [
    { label: "Account Holder Name", value: "Raj samami" },
    { label: "Account Number", value: "7700818001" },
    { label: "IFSC Code", value: "KKBK3432523" },
    { label: "Bank Name", value: "Punjab National Bank" },
  ];

  return (
    <div className="bg-blue-100  py-4 w-full">
      <div className=" grid grid-cols-2 font-semibold border-b pb-2 px-4 text-[20px] md:text-[22px]">
        <div className="flex items-start justify-start">Bank Details</div>
      </div>

      {stats.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-2  border-b-[1px] border-gray-950 text-[13px] md:text-[20px] px-4 py-3 ${
            index % 2 === 0 ? "bg-blue-200" : ""
          }`}
        >
          <div className="flex items-start justify-start">{item.label}</div>
          <div className="flex items-start justify-start">{item.value}</div>
        </div>
      ))}

      {/* <div className="text-center mt-10">
        <button className="bg-gray-800 text-white px-6 py-2 rounded-[5px] shadow text-[18px]">
          CLICK HERE FOR TRANSFER HISTORY
        </button>
      </div> */}
    </div>
  );
};

export default BankDetailsh;
