const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock user data
const users = [];

// Routes
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Add new user
  users.push({ email, password });
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ message: "Login successful", user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
