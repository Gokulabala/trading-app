// src/context/FundsContext.js
import React, { createContext, useState } from "react";

export const FundsContext = createContext();

export const FundsProvider = ({ children }) => {
  const [equityFunds, setEquityFunds] = useState(1000000);
  const [commodityFunds, setCommodityFunds] = useState(1000000);

  const addFunds = () => {
    setEquityFunds((prev) => prev + 1000000);
    setCommodityFunds((prev) => prev + 1000000);
  };

  const resetFunds = () => {
    setEquityFunds(1000000);
    setCommodityFunds(1000000);
  };

  return (
    <FundsContext.Provider
      value={{ equityFunds, commodityFunds, addFunds, resetFunds }}
    >
      {children}
    </FundsContext.Provider>
  );
};
