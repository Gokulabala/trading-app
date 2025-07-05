// src/pages/Funds.js
import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const Funds = () => {
  const [equityFunds, setEquityFunds] = useState(0);
  const [commodityFunds, setCommodityFunds] = useState(0);

  useEffect(() => {
    const storedFunds = JSON.parse(localStorage.getItem("funds"));
    if (storedFunds) {
      setEquityFunds(storedFunds.equity);
      setCommodityFunds(storedFunds.commodity);
    } else {
      resetFunds();
    }
  }, []);

  const persistFunds = (equity, commodity) => {
    localStorage.setItem(
      "funds",
      JSON.stringify({ equity, commodity })
    );
  };

  const addFunds = () => {
    const newEquity = equityFunds + 1000000;
    const newCommodity = commodityFunds + 1000000;
    setEquityFunds(newEquity);
    setCommodityFunds(newCommodity);
    persistFunds(newEquity, newCommodity);
  };

  const resetFunds = () => {
    setEquityFunds(1000000);
    setCommodityFunds(1000000);
    persistFunds(1000000, 1000000);
  };

  const renderFundBlock = (title, amount) => (
    <div className="w-full md:w-1/2 px-4">
      <div className="bg-[#121212] rounded-md p-4 text-white shadow">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-400">Available margin</p>
        <p className="text-2xl font-bold mb-4">₹{amount.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
          <p>Used margin</p>
          <p>0.00</p>
          <p>Available cash</p>
          <p>₹{amount.toLocaleString()}</p>
          <p>Opening balance</p>
          <p>₹{amount.toLocaleString()}</p>
          <p>Payin</p>
          <p>0.00</p>
          <p>Payout</p>
          <p>0.00</p>
          <p>SPAN</p>
          <p>0.00</p>
          <p>Delivery margin</p>
          <p>0.00</p>
          <p>Exposure</p>
          <p>0.00</p>
          <p>Options premium</p>
          <p>0.00</p>
          <p>Collateral (Liquid funds)</p>
          <p>0.00</p>
          <p>Collateral (Equity)</p>
          <p>0.00</p>
          <p>Total collateral</p>
          <p>0.00</p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex justify-end space-x-2 mb-4 px-6">
        <button
          onClick={addFunds}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Funds
        </button>
        <button
          onClick={resetFunds}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Reset Funds
        </button>
      </div>
      <div className="flex flex-col md:flex-row px-6 gap-6">
        {renderFundBlock("Equity", equityFunds)}
        {renderFundBlock("Commodity", commodityFunds)}
      </div>
    </DashboardLayout>
  );
};

export default Funds;
