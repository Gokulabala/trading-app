import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const email = user?.email || "";
  const firstName = email.split("@")[0].toUpperCase();
  const initial = firstName[0];

  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase()}`);
  };

  return (
    <nav className="bg-[#181818] text-white h-12 flex items-center justify-between px-4 shadow-md text-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4 text-gray-300 font-medium">
        <div>
          <span className="text-blue-400">NIFTY 50</span>{" "}
          <span className="text-white">25453.40</span>{" "}
          <span className="text-red-400">-88.40 (-0.35%)</span>
        </div>
        <div>
          <span className="text-blue-400">SENSEX</span>{" "}
          <span className="text-white">83409.69</span>{" "}
          <span className="text-red-400">-287.60 (-0.34%)</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-10">
        <span className="text-orange-500 font-bold text-lg">🧿</span>

        <div className="flex items-center space-x-6 text-sm">
          {["Dashboard", "Orders", "Holdings", "Positions", "Bids", "Funds"].map(
            (item, idx) => (
              <button
                key={idx}
                onClick={() => handleTabClick(item)}
                className={`transition duration-200 ${
                  activeTab === item
                    ? "text-orange-400 font-semibold"
                    : "text-gray-300 hover:text-blue-300"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <FaShoppingCart className="text-gray-400 cursor-pointer" />
        <FaBell className="text-yellow-400 cursor-pointer" />

        <div className="bg-red-800 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
          {initial}
        </div>
        <span className="text-white text-xs font-semibold">{firstName}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
