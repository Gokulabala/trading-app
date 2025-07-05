// src/pages/Orders.js
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { FiBook } from "react-icons/fi";

const Orders = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const storedTrades = JSON.parse(localStorage.getItem("trades")) || [];
    setTrades(storedTrades.reverse()); // Show latest trade first
  }, []);

  const formatNumber = (num) =>
    num?.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <DashboardLayout>
      <div className="text-white px-6 pt-4">
        {/* Top Tabs */}
        <div className="flex space-x-8 border-b border-gray-700 mb-8 text-sm">
          {["Orders"].map((tab, index) => (
            <button
              key={index}
              className={`pb-2 ${
                tab === "Orders"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {trades.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center mt-20 space-y-4">
            <FiBook className="text-4xl text-gray-500" />
            <p className="text-gray-400">You haven't placed any orders today</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
              Get started
            </button>
            <button className="text-sm text-blue-500 hover:underline mt-1">
              View history
            </button>
          </div>
        ) : (
          // Trade History Table
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-gray-300">
              <thead>
                <tr className="bg-[#1f1f1f] text-left border-b border-gray-700">
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Stock</th>
                  <th className="py-2 px-3">Qty</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3">Total</th>
                  <th className="py-2 px-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-[#262626]"
                  >
                    <td
                      className={`py-2 px-3 font-bold ${
                        trade.type === "BUY" ? "text-blue-400" : "text-orange-400"
                      }`}
                    >
                      {trade.type}
                    </td>
                    <td className="py-2 px-3">{trade.stock}</td>
                    <td className="py-2 px-3">{trade.qty}</td>
                    <td className="py-2 px-3">₹{formatNumber(trade.price)}</td>
                    <td className="py-2 px-3">
                      ₹{formatNumber(trade.totalCost || trade.totalGain)}
                    </td>
                    <td className="py-2 px-3 text-xs">{trade.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Orders;
