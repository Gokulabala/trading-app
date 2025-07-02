// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import route handlers
const loginRoutes = require("./routes/login");       // POST /api/auth/login
const registerRoutes = require("./routes/register"); // POST /api/auth/register
const flattradeRoutes = require("./routes/flattrade"); // Flattrade API endpoints

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// Mount API routes
app.use("/api/auth", registerRoutes);  // /api/auth/register
app.use("/api/auth", loginRoutes);     // /api/auth/login
app.use("/api/market-data", flattradeRoutes); // /api/market-data/...

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
