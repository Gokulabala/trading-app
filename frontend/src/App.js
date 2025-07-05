// src/App.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StockDetails from "./pages/StockDetails";
import Callback from "./pages/Callback";
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./pages/Orders";
import Holdings from "./pages/Holdings";
import Positions from "./pages/Positions";
import Bids from "./pages/Bids";
import Funds from "./pages/Funds";
import { FundsProvider } from "./context/FundsContext";

const App = () => {
  return (
    <FundsProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/callback" element={<Callback />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:symbol"
          element={
            <PrivateRoute>
              <StockDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/holdings"
          element={
            <PrivateRoute>
              <Holdings />
            </PrivateRoute>
          }
        />
        <Route
          path="/positions"
          element={
            <PrivateRoute>
              <Positions />
            </PrivateRoute>
          }
        />
        <Route
          path="/bids"
          element={
            <PrivateRoute>
              <Bids />
            </PrivateRoute>
          }
        />
        <Route
          path="/funds"
          element={
            <PrivateRoute>
              <Funds />
            </PrivateRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </FundsProvider>
  );
};

export default App;
