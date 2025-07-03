import React from "react";

const TransferHistory = () => {
  const stats = [
    {
      id: "1",
      amount: "1000",
      date: "2023-10-01",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "2",
      amount: "2000",
      date: "2023- 10-02",
      status: "Pending",
      type: "BCT",
    },
    {
      id: "3",
      amount: "1500",
      date: "2023-10-03",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "4",
      amount: "1200",
      date: "2023-10-04",
      status: "Failed",
      type: "BCT",
    },
    {
      id: "5",
      amount: "1800",
      date: "2023-10-05",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "6",
      amount: "1000",
      date: "2023-10-01",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "7",
      amount: "2000",
      date: "2023- 10-02",
      status: "Pending",
      type: "BCT",
    },
    {
      id: "8",
      amount: "1500",
      date: "2023-10-03",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "9",
      amount: "1200",
      date: "2023-10-04",
      status: "Failed",
      type: "BCT",
    },
    {
      id: "10",
      amount: "1800",
      date: "2023-10-05",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "11",
      amount: "1000",
      date: "2023-10-01",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "12",
      amount: "2000",
      date: "2023- 10-02",
      status: "Pending",
      type: "BCT",
    },
    {
      id: "13",
      amount: "1500",
      date: "2023-10-03",
      status: "Completed",
      type: "Saleable",
    },
    {
      id: "14",
      amount: "1200",
      date: "2023-10-04",
      status: "Failed",
      type: "BCT",
    },
    {
      id: "15",
      amount: "1800",
      date: "2023-10-05",
      status: "Completed",
      type: "Saleable",
    },
  ];
  return (
    <div className="bg-blue-100 py-2">
      <div className="grid grid-cols-5 font-semibold border-b pb-2 px-4 text-[12px] md:text-[22px]">
        <div className="flex items-center justify-center">ID</div>
        <div className="flex items-center justify-center">Amount</div>
        <div className="flex items-center justify-center">Date</div>
        <div className="flex items-center justify-center">Status</div>
        <div className="flex items-center justify-center">Type</div>
      </div>
      {stats.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-5 border-b-[1px] border-gray-950 text-[10px] md:text-[20px] px-4 py-3 ${
            index % 2 === 0 ? "bg-blue-200" : ""
          }`}
        >
          <div className="flex items-center justify-center">{item.id}</div>
          <div className="flex items-center justify-center">{item.amount}</div>
          <div className="flex items-center justify-center">{item.date}</div>
          <div
            className={`flex items-center justify-center 
                ${item.status === "Completed" ? "text-green-500" : ""}
                ${item.status === "Pending" ? "text-yellow-500" : ""}
                ${item.status === "Failed" ? "text-red-500" : ""}
             `}
          >
            {item.status}
          </div>

          <div className="flex items-center justify-center">{item.type}</div>
        </div>
      ))}
    </div>
  );
};

export default TransferHistory;
