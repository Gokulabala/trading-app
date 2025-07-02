// src/components/StockDetailPanel.js

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const StockDetailPanel = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/market-data/${symbol}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setStockData(res.data);
      } catch (err) {
        console.error(err);
        setStockData(null);
      }
    };

    if (symbol) fetchStock();
  }, [symbol, user]);

  if (!stockData) return <p>Loading data for {symbol}...</p>;

  return (
    <div>
      <h2>{stockData.symbol}</h2>
      <p>
        <strong>Price:</strong> ₹{stockData.price}
      </p>
      <p>
        <strong>Change:</strong> {stockData.change} ({stockData.percentChange}%)
      </p>
      <p>
        <strong>Time:</strong> {stockData.time}
      </p>
    </div>
  );
};

export default StockDetailPanel;
