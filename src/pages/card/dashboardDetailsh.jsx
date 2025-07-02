import React from "react";
const DashboardDetails = () => {
  const stats = [
    { label: "Total MPC (INR)", value: ".00" },
    { label: "Total Sold Saleable", value: ".00" },
    { label: "Total Purchased Saleable", value: ".00" },
    { label: "Total Sold BCT", value: ".00" },
  ];

  return (
    <div className="bg-blue-100  py-4">
      <div className=" grid grid-cols-2 gap-x-[90px] font-semibold border-b pb-2 px-4 text-[20px] md:text-[22px]">
        <div className="flex items-center justify-center">Particulars</div>
        <div className="flex items-center justify-center">Value</div>
      </div>

      {stats.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-2 gap-x-[90px] border-b-[1px] border-gray-950 text-[18px] md:text-[20px] px-4 py-3 ${
            index % 2 === 0 ? "bg-blue-200" : ""
          }`}
        >
          <div className="flex items-center justify-center">{item.label}</div>
          <div className="flex items-center justify-center">{item.value}</div>
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

export default DashboardDetails;
