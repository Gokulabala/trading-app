// components/SellOrderModal.js
import React, { useState, useEffect } from "react";

const SellOrderModal = ({ stock, onClose }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock?.price || 0);
  const [availableFunds, setAvailableFunds] = useState(0);

  const minPrice = +(stock.price * 0.9).toFixed(2);
  const maxPrice = +(stock.price * 1.1).toFixed(2);

  useEffect(() => {
    try {
      const storedFunds = JSON.parse(localStorage.getItem("funds"));
      const funds = isNaN(storedFunds) ? 1000000 : parseFloat(storedFunds);
      setAvailableFunds(funds);
    } catch {
      setAvailableFunds(1000000);
    }
  }, []);

  const handleSell = () => {
    const enteredQty = Number(qty);
    const enteredPrice = Number(price);
    const totalGain = +(enteredQty * enteredPrice - 13.12).toFixed(2);

    if (enteredPrice < minPrice || enteredPrice > maxPrice) {
      alert(`Price must be within ±10% of market price (₹${minPrice} - ₹${maxPrice})`);
      return;
    }

    if (enteredQty <= 0 || isNaN(enteredQty)) {
      alert("Quantity must be a positive number.");
      return;
    }

    const updatedFunds = +(availableFunds + totalGain).toFixed(2);
    localStorage.setItem("funds", JSON.stringify(updatedFunds));
    setAvailableFunds(updatedFunds);

    const trades = JSON.parse(localStorage.getItem("trades")) || [];
    trades.push({
      type: "SELL",
      stock: stock.name,
      qty: enteredQty,
      price: enteredPrice.toFixed(2),
      totalGain,
      time: new Date().toLocaleString(),
    });
    localStorage.setItem("trades", JSON.stringify(trades));

    alert("Sell order placed successfully!");
    onClose();
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[600px] bg-[#1c1c1e] text-white rounded-md shadow-xl p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="font-bold text-lg text-orange-400">{stock.name}</h2>
          <p className="text-sm text-gray-400">NSE ₹{stock.price.toFixed(2)}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
          &times;
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-gray-400">Qty.</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            min="1"
            className="w-full px-3 py-2 mt-1 bg-[#2a2a2e] text-white border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 mt-1 bg-[#2a2a2e] text-white border border-gray-600 rounded"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
        <div>
          Gain ₹{(qty * price - 13.12).toFixed(2)} | Available ₹
          {availableFunds ? availableFunds.toFixed(2) : "0.00"}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="bg-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSell}
            className="bg-orange-600 text-sm px-4 py-2 rounded hover:bg-orange-700"
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellOrderModal;
