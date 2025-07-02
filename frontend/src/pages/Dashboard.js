import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/market-data/${symbol}`
      );

      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError(
        "Failed to fetch stock data. Try a valid symbol like INFY-EQ or NIFTY50."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Flattrade Stock Dashboard</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter symbol (e.g., INFY-EQ, NIFTY50)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button
          onClick={fetchStockData}
          disabled={!symbol}
          style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
        >
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {stockData && (
        <div
          style={{
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h2>Data for {stockData.symbol}</h2>
          <p>
            <strong>Price:</strong> ₹{stockData.price}
          </p>
          <p>
            <strong>Change:</strong> {stockData.change} (
            {stockData.percentChange}%)
          </p>
          <p>
            <strong>Time:</strong> {stockData.time}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
