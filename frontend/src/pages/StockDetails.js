import React, { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

const StockDetails = () => {
  const { symbol } = useParams(); // Get the stock symbol from the URL

  const [stock, setStock] = useState(null); // State to store stock details

  const [loading, setLoading] = useState(false); // State for loading indicator

  const [error, setError] = useState(null); // State for error handling

  const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your Flat Trade API key

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);

      setError(null);

      try {
        // Fetch detailed stock data

        const response = await axios.get(
          `https://api.flat.trade/market-data/${symbol}`,

          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const stockData = {
          symbol: symbol,

          currentPrice: response.data.price,

          highPrice: response.data.high,

          lowPrice: response.data.low,

          openPrice: response.data.open,

          previousClose: response.data.previousClose,

          change: response.data.change,

          changePercent: response.data.changePercent,
        };

        setStock(stockData); // Update state with stock details
      } catch (error) {
        console.error("Error fetching stock details:", error.message);

        setError("Failed to fetch stock details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Stock Details: {symbol}</h1>

      {stock ? (
        <div>
          <p>
            <strong>Current Price:</strong> ${stock.currentPrice}
          </p>
          <p>
            <strong>High Price:</strong> ${stock.highPrice}
          </p>
          <p>
            <strong>Low Price:</strong> ${stock.lowPrice}
          </p>
          <p>
            <strong>Open Price:</strong> ${stock.openPrice}
          </p>
          <p>
            <strong>Previous Close:</strong> ${stock.previousClose}
          </p>
          <p>
            <strong>Change:</strong>{" "}
            {stock.change > 0 ? `+${stock.change}` : stock.change}
          </p>
          <p>
            <strong>Change Percent:</strong>{" "}
            {stock.changePercent > 0
              ? `+${stock.changePercent}%`
              : `${stock.changePercent}%`}
          </p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default StockDetails;
