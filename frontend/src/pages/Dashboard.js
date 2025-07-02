import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ Navbar component

const Dashboard = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/market-data/${symbol}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token || ""}`,
          },
        }
      );
      setStockData(response.data);
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError(
        "Failed to fetch stock data. Try a valid symbol like INFY-EQ or NIFTY50."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* ✅ Zerodha-style Navbar */}

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <label htmlFor="symbol" className="block mb-1 text-sm font-medium">
            Enter symbol (e.g., INFY-EQ, NIFTY50)
          </label>
          <div className="flex gap-2">
            <input
              id="symbol"
              type="text"
              placeholder="Enter stock symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={fetchStockData}
              disabled={!symbol}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Fetch
            </button>
          </div>
        </div>

        {/* Output */}
        {loading && <p className="text-blue-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {stockData && (
          <div className="bg-white rounded shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">
              {stockData.symbol}
            </h2>
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
      </main>
    </div>
  );
};

export default Dashboard;
