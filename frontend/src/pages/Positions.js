import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { FaAnchor } from "react-icons/fa";

const Positions = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh] text-white px-4">
        <FaAnchor size={50} className="text-gray-500 mb-4" />
        <p className="text-sm text-gray-400 mb-4">
          You don't have any positions yet
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium mb-2">
          Get started
        </button>

        <button className="text-blue-400 text-sm flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          Analytics
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Positions;
