import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const Holdings = () => {
  const holdings = [
    {
      instrument: "IEX",
      qty: 400,
      avgCost: 211.43,
      ltp: 197.63,
      invested: 84573,
      currentValue: 79052,
      pnl: -5521,
      netChange: "-6.53%",
      dayChange: "-0.06%",
    },
    {
      instrument: "SUBEXLTD-BE",
      qty: 1111,
      avgCost: 52.36,
      ltp: 14.31,
      invested: 58175.25,
      currentValue: 15898.41,
      pnl: -42276.84,
      netChange: "-72.67%",
      dayChange: "+0.21%",
    },
  ];

  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPercent = ((totalPnL / totalInvested) * 100).toFixed(2);

  return (
    <DashboardLayout>
      <div className="text-white px-6 py-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-4">
          {["All", "Equity", "Mutual funds"].map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 text-sm font-medium ${
                idx === 0
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Holdings (2)</h2>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Total investment</div>
              <div className="text-white font-semibold">
                ₹{totalInvested.toLocaleString("en-IN")}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Current value</div>
              <div className="text-white font-semibold">
                ₹{totalCurrent.toLocaleString("en-IN")}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Day's P&L</div>
              <div className="text-red-500 font-semibold">-14.67</div>
              <div className="text-xs bg-red-600 inline-block px-1 rounded mt-1">
                -0.02%
              </div>
            </div>
            <div>
              <div className="text-gray-400">Total P&L</div>
              <div className="text-red-500 font-semibold">
                ₹{totalPnL.toLocaleString("en-IN")}
              </div>
              <div className="text-xs bg-red-600 inline-block px-1 rounded mt-1">
                {totalPnLPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full text-sm border-t border-gray-700">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="py-2">Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Invested</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((item, i) => (
                <tr key={i} className="border-t border-gray-800">
                  <td className="py-2">{item.instrument}</td>
                  <td>{item.qty}</td>
                  <td>{item.avgCost}</td>
                  <td>{item.ltp}</td>
                  <td>₹{item.invested.toLocaleString("en-IN")}</td>
                  <td>₹{item.currentValue.toLocaleString("en-IN")}</td>
                  <td className="text-red-500">₹{item.pnl.toLocaleString("en-IN")}</td>
                  <td className="text-red-400">{item.netChange}</td>
                  <td
                    className={
                      item.dayChange.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {item.dayChange}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="border-t border-gray-700 font-semibold">
                <td className="py-2">Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td>₹{totalInvested.toLocaleString("en-IN")}</td>
                <td>₹{totalCurrent.toLocaleString("en-IN")}</td>
                <td className="text-red-500">₹{totalPnL.toLocaleString("en-IN")}</td>
                <td className="text-red-400">{totalPnLPercent}%</td>
                <td className="text-red-400">-0.02%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bar chart dummy */}
        <div className="h-10 w-full bg-blue-600 flex">
          <div className="bg-blue-500 w-2/3"></div>
          <div className="bg-cyan-400 w-1/3"></div>
        </div>
        <div className="text-xs text-gray-400 mt-2 flex gap-6">
          <label className="flex items-center gap-1">
            <input type="radio" checked readOnly />
            Current value
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" readOnly />
            Investment value
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" readOnly />
            P&L
          </label>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Holdings;
