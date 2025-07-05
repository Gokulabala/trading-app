import React, { useState } from "react";
import BuyOrderModal from "./BuyOrderModal";
import SellOrderModal from "./SellOrderModal";

const dummyStocks = [
  { name: "MARUTI", change: -105, percent: -0.82, price: 12647 },
  { name: "VEDL", change: -0.55, percent: -0.12, price: 457.75 },
  { name: "ICICIBANK", change: +10.5, percent: +0.74, price: 1436.4 },
  { name: "RPOWER-BE", change: +0.31, percent: +0.47, price: 65.85 },
  { name: "ITC", change: -1.35, percent: -0.33, price: 412 },
  { name: "LICI", change: -10.55, percent: -1.12, price: 935.45 },
  { name: "TATAELXSI", change: -10, percent: -0.16, price: 6205 },
  { name: "ASHOKLEY", change: -0.95, percent: -0.38, price: 249.55 },
  { name: "INDIA VIX", change: -0.03, percent: -0.24, price: 12.36 },
];

const Sidebar = () => {
  const [hoveredStock, setHoveredStock] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
    setShowBuyModal(true);
    setShowSellModal(false);
  };

  const handleSellClick = (stock) => {
    setSelectedStock(stock);
    setShowSellModal(true);
    setShowBuyModal(false);
  };

  return (
    <>
      <aside className="w-60 bg-[#121212] text-sm text-white border-r border-gray-800 overflow-y-auto">
        <div className="px-3 py-3 border-b border-gray-800">
          <input
            type="text"
            placeholder="Search eg: infy, nifty..."
            className="w-full px-3 py-1 rounded bg-[#1f1f1f] text-white focus:outline-none"
          />
        </div>

        <div className="px-3 py-2 border-b border-gray-700 font-semibold text-gray-400">
          Default (9)
        </div>

        <ul className="divide-y divide-gray-800">
          {dummyStocks.map((stock, idx) => (
            <li
              key={idx}
              onMouseEnter={() => setHoveredStock(stock.name)}
              onMouseLeave={() => setHoveredStock(null)}
              className="relative px-4 py-2 hover:bg-[#1c1c1e] cursor-pointer"
            >
              <div className="flex justify-between font-medium">
                <span className="text-blue-300">{stock.name}</span>
                <span
                  className={`${
                    stock.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stock.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change}
                </span>
                <span>
                  ({stock.percent >= 0 ? "+" : ""}
                  {stock.percent}%)
                </span>
              </div>

              {/* Hover Actions */}
              {hoveredStock === stock.name && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button
                    onClick={() => handleBuyClick(stock)}
                    className="bg-blue-600 w-6 h-6 text-xs rounded hover:bg-blue-700"
                  >
                    B
                  </button>
                  <button
                    onClick={() => handleSellClick(stock)}
                    className="bg-red-600 w-6 h-6 text-xs rounded hover:bg-red-700"
                  >
                    S
                  </button>
                  <button className="bg-[#2a2a2e] w-6 h-6 text-xs rounded text-white">
                    ⋮
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Modals */}
      {showBuyModal && (
        <BuyOrderModal stock={selectedStock} onClose={() => setShowBuyModal(false)} />
      )}
      {showSellModal && (
        <SellOrderModal stock={selectedStock} onClose={() => setShowSellModal(false)} />
      )}
    </>
  );
};

export default Sidebar;
