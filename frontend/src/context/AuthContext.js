import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
 
const AuthContext = createContext();
 
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const navigate = useNavigate(); // useNavigate works because AuthProvider is inside Router
 
  const login = (userData) => {
    setUser(userData); // Set the user data
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
    navigate("/dashboard"); // Redirect to Dashboard
  };
 
  const logout = () => {
    setUser(null); // Clear the user data
    localStorage.removeItem("user"); // Remove from localStorage
    navigate("/login"); // Redirect to Login
  };
 
  return (
<AuthContext.Provider value={{ user, login, logout }}>
      {children}
</AuthContext.Provider>
  );
};
 
export { AuthContext, AuthProvider };