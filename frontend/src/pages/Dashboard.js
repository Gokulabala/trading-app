import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <div className="p-6 text-white">
        {/* Overview Header */}
        <h1 className="text-2xl font-semibold mb-6">Hi, {user?.email?.split("@")[0]}</h1>

        {/* Equity and Commodity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#1c1c1e] p-6 rounded shadow text-sm">
            <h2 className="text-lg font-medium mb-4">💧 Equity</h2>
            <div className="flex justify-between">
              <div>
                <p className="text-3xl font-bold">159.1</p>
                <p className="text-gray-400">Margin available</p>
              </div>
              <div className="space-y-2 text-right text-xs">
                <p>Margins used: <span className="text-white">0</span></p>
                <p>Opening balance: <span className="text-white">159.1</span></p>
                <p className="text-blue-400 cursor-pointer">View statement</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1c1c1e] p-6 rounded shadow text-sm">
            <h2 className="text-lg font-medium mb-4">💧 Commodity</h2>
            <div className="flex justify-between">
              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="text-gray-400">Margin available</p>
              </div>
              <div className="space-y-2 text-right text-xs">
                <p>Margins used: <span className="text-white">0</span></p>
                <p>Opening balance: <span className="text-white">0</span></p>
                <p className="text-blue-400 cursor-pointer">View statement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div className="bg-[#1c1c1e] p-6 rounded shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">📦 Holdings (2)</h2>
          </div>
          <div className="text-3xl text-red-500 font-bold">
            -47.97k <span className="text-sm text-red-400 align-top">-33.61%</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-400">Current value</p>
              <p className="text-white font-medium">₹94.78k</p>
            </div>
            <div>
              <p className="text-gray-400">Investment</p>
              <p className="text-white font-medium">₹1.43L</p>
            </div>
          </div>

          {/* Dummy bar */}
          <div className="mt-4 bg-blue-600 rounded h-6 relative overflow-hidden">
            <div className="absolute left-2 top-[6px] w-3 h-3 rounded-full bg-blue-300"></div>
            <div className="absolute right-2 top-[6px] w-3 h-3 rounded-full bg-cyan-400"></div>
          </div>

          <div className="text-xs mt-2 text-gray-300 flex justify-between">
            <span>₹94,775.74</span>
            <span className="flex gap-4">
              <span className="text-blue-400">◉</span> Current value
              <span className="text-gray-500">○</span> Investment
              <span className="text-gray-500">○</span> P&L
            </span>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-[#1c1c1e] p-6 rounded shadow text-sm">
          <h2 className="text-lg font-medium mb-4">📈 Market overview</h2>
          <div className="h-40 bg-[#0f0f0f] rounded mb-4 flex items-center justify-center text-gray-600 italic">
            [Dummy Chart Area for NIFTY 50]
          </div>
          <div className="text-center">
            <p className="text-gray-400 mb-2">You don’t have any positions yet</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
              Get started
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
