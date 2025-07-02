import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StockDetails from "./pages/StockDetails";
import PrivateRoute from "./components/PrivateRoute";
import Callback from "./pages/Callback"; 

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/callback" element={<Callback />} />
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
    </Routes>
  );
};

export default App;
