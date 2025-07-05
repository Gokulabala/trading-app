import React from "react";
import { FaChartLine, FaTrashAlt, FaEllipsisH } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";

const StockItem = ({ name, price, change }) => {
  const isNegative = change < 0;

  return (
    <div className="relative group px-4 py-2 hover:bg-[#1c1c1e] transition-colors border-b border-[#2c2c2e]">
      <div className="flex justify-between items-center text-sm text-white">
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className={`text-xs ${isNegative ? "text-red-400" : "text-green-400"}`}>
            {change} ({((change / price) * 100).toFixed(2)}%)
          </span>
        </div>
        <span className={`font-semibold ${isNegative ? "text-red-400" : "text-green-400"}`}>
          {price.toFixed(2)}
        </span>
      </div>

      {/* Hover Actions */}
      <div className="absolute top-1/2 -translate-y-1/2 right-2 hidden group-hover:flex gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-xs text-white px-2 py-1 rounded">B</button>
        <button className="bg-red-600 hover:bg-red-700 text-xs text-white px-2 py-1 rounded">S</button>
        <button className="bg-[#2c2c2e] text-white p-1 rounded border border-[#3a3a3c]">
          <MdOutlineMenu size={12} />
        </button>
        <button className="bg-[#2c2c2e] text-white p-1 rounded border border-[#3a3a3c]">
          <FaChartLine size={12} />
        </button>
        <button className="bg-[#2c2c2e] text-white p-1 rounded border border-[#3a3a3c]">
          <FaTrashAlt size={12} />
        </button>
        <button className="bg-[#2c2c2e] text-white p-1 rounded border border-[#3a3a3c]">
          <FaEllipsisH size={12} />
        </button>
      </div>
    </div>
  );
};

export default StockItem;
