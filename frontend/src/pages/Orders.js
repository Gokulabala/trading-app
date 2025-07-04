// src/pages/Orders.js
import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { FiBook } from "react-icons/fi";

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="text-white px-6 pt-4">
        {/* Top Tabs */}
        <div className="flex space-x-8 border-b border-gray-700 mb-8 text-sm">
          {["Orders", "GTT", "Baskets", "SIP", "Alerts"].map((tab, index) => (
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

        {/* Empty State */}
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
      </div>
    </DashboardLayout>
  );
};

export default Orders;
