import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]); // State to store stock data
  const [symbol, setSymbol] = useState("IBM"); // State for stock symbol
  const [interval, setInterval] = useState("5min"); // State for time interval
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your Alpha Vantage API key

  const fetchStocks = async () => {
    setLoading(true); // Show loading indicator
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`
      );

      const timeSeries = response.data["Time Series (" + interval + ")"];
      const stockData = Object.keys(timeSeries).map((timestamp) => ({
        time: timestamp,
        open: parseFloat(timeSeries[timestamp]["1. open"]),
        high: parseFloat(timeSeries[timestamp]["2. high"]),
        low: parseFloat(timeSeries[timestamp]["3. low"]),
        close: parseFloat(timeSeries[timestamp]["4. close"]),
        volume: parseInt(timeSeries[timestamp]["5. volume"]),
      }));

      setStocks(stockData); // Update state with stock data
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError(
        "Failed to fetch stock data. Please check the symbol and interval."
      );
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const calculatePercentageChange = (open, close) => {
    return (((close - open) / open) * 100).toFixed(2); // Calculate percentage change
  };

  return (
    <div>
      <h1>Stock Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., IBM)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())} // Update symbol state
        />
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)} // Update interval state
        >
          <option value="1min">1 Minute</option>
          <option value="5min">5 Minutes</option>
          <option value="15min">15 Minutes</option>
          <option value="30min">30 Minutes</option>
          <option value="60min">60 Minutes</option>
        </select>
        <button onClick={fetchStocks}>Fetch Stock Data</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
              <th>% Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.time}</td>
                <td>{stock.open}</td>
                <td>{stock.high}</td>
                <td>{stock.low}</td>
                <td>{stock.close}</td>
                <td>{stock.volume}</td>
                <td>{calculatePercentageChange(stock.open, stock.close)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
