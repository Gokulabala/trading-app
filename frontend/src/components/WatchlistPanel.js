// src/components/WatchlistPanel.js

import React from "react";

const dummyStocks = ["RELIANCE-EQ", "TCS-EQ", "INFY-EQ", "SBIN-EQ", "HDFCBANK-EQ"];

const WatchlistPanel = ({ onSelectSymbol }) => {
  return (
    <div>
      <h2>Watchlist</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {dummyStocks.map((stock) => (
          <li
            key={stock}
            onClick={() => onSelectSymbol(stock)}
            style={{
              padding: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
            }}
          >
            {stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistPanel;
