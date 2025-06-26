import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]); // State to store stock data
  const [search, setSearch] = useState(""); // State for the search bar
  const [loading, setLoading] = useState(false); // State for loading indicator

  const API_KEY = "YOUR_API_KEY"; // Replace with your Alpha Vantage API key

  useEffect(() => {
    // Fetch stock data when the component loads
    const fetchStocks = async () => {
      setLoading(true); // Show loading indicator
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`
        );

        // Extract stock data from the API response
        const timeSeries = response.data["Time Series (5min)"];
        const stockData = Object.keys(timeSeries).map((timestamp) => ({
          time: timestamp,
          open: timeSeries[timestamp]["1. open"],
          high: timeSeries[timestamp]["2. high"],
          low: timeSeries[timestamp]["3. low"],
          close: timeSeries[timestamp]["4. close"],
        }));

        setStocks(stockData); // Update state with stock data
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchStocks();
  }, []);

  // Filter stocks based on the search input
  const filteredStocks = stocks.filter((stock) =>
    stock.time.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Stock Dashboard</h1>
      <input
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.time}</td>
                <td>{stock.open}</td>
                <td>{stock.high}</td>
                <td>{stock.low}</td>
                <td>{stock.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
