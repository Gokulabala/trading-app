import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const ipoData = [
  {
    name: "WHITEFORCE",
    subtitle: "Happy Square Outsourcing Services",
    date: "3rd — 7th Jul",
    price: "72 - 76",
    minAmount: "121600",
    qty: "1600",
    status: "Apply",
  },
  {
    name: "VANDAN",
    subtitle: "Vandan Foods",
    date: "30th Jun — 2nd Jul",
    price: "115",
    minAmount: "138000",
    qty: "1200",
    status: "Closed",
  },
  {
    name: "VALINDIA",
    subtitle: "Valencia India",
    date: "26th — 30th Jun",
    price: "95 - 110",
    minAmount: "132000",
    qty: "1200",
    status: "Closed",
  },
  {
    name: "TRAVELFOOD",
    subtitle: "Travel Food Services",
    date: "7th — 9th Jul",
    price: "1045 - 1100",
    minAmount: "14300",
    qty: "13",
    status: "Pre-apply",
  },
  {
    name: "SMARTECH",
    subtitle: "Smarten Power Systems",
    date: "7th — 9th Jul",
    price: "100",
    minAmount: "240000",
    qty: "2400",
    status: "Upcoming",
  },
];

const StatusButton = ({ status }) => {
  const baseStyle =
    "text-sm px-3 py-1 rounded font-medium capitalize min-w-[80px] text-center";
  switch (status.toLowerCase()) {
    case "apply":
      return <button className={`${baseStyle} bg-blue-600 text-white`}>Apply</button>;
    case "pre-apply":
      return <button className={`${baseStyle} bg-blue-700 text-white`}>Pre-apply</button>;
    case "upcoming":
      return <div className={`${baseStyle} bg-gray-800 text-yellow-400`}>Upcoming</div>;
    case "closed":
    default:
      return <div className={`${baseStyle} bg-gray-700 text-gray-400`}>Closed</div>;
  }
};

const Bids = () => {
  return (
    <DashboardLayout>
      <div className="p-6 text-white">
        {/* Tabs */}
        <div className="flex gap-8 text-sm mb-6 border-b border-gray-700">
          <button className="pb-2 border-b-2 border-orange-500 font-medium text-orange-500">
            IPO
          </button>
          <button className="text-gray-400 hover:text-white">Govt. securities</button>
          <button className="text-gray-400 hover:text-white">Auctions</button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 text-gray-400 px-4 py-2 border-b border-gray-700 text-sm font-medium">
          <span>Instrument</span>
          <span>Date</span>
          <span>Price (₹)</span>
          <span>Min. amount (₹)</span>
          <span className="text-right">Action</span>
        </div>

        {/* IPO rows */}
        {ipoData.map((ipo) => (
          <div
            key={ipo.name}
            className="grid grid-cols-5 items-center px-4 py-4 border-b border-gray-800 hover:bg-[#1a1a1a] text-sm"
          >
            <div>
              <span className="text-white font-semibold">{ipo.name}</span>
              <div className="text-gray-400 text-xs">{ipo.subtitle}</div>
            </div>
            <div className="text-gray-300">{ipo.date}</div>
            <div className="text-gray-300">{ipo.price}</div>
            <div className="text-gray-300">
              ₹{ipo.minAmount}
              <div className="text-xs text-gray-500">{ipo.qty} Qty.</div>
            </div>
            <div className="text-right">
              <StatusButton status={ipo.status} />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Bids;
