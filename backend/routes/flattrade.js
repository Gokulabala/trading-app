// routes/flattrade.js
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const router = express.Router();
require("dotenv").config();

const API_KEY = process.env.FLAT_TRADE_API_KEY;
const API_SECRET = process.env.FLAT_TRADE_API_SECRET;

// GET /api/flattrade/login - return login URL to redirect manually
router.get("/login", (req, res) => {
  const loginUrl = `https://auth.flattrade.in/?app_key=${API_KEY}`;
  res.json({ loginUrl });
});

// POST /api/flattrade/token - exchange request_code for access token
router.post("/token", async (req, res) => {
  const { request_code } = req.body;

  if (!request_code) {
    return res.status(400).json({ error: "Missing request_code" });
  }

  const hash = crypto
    .createHash("sha256")
    .update(API_KEY + request_code + API_SECRET)
    .digest("hex");

  try {
    const response = await axios.post(
      "https://authapi.flattrade.in/trade/apitoken",
      {
        api_key: API_KEY,
        request_code: request_code,
        api_secret: hash
      }
    );

    if (response.data.stat === "Ok") {
      return res.json({
        accessToken: response.data.token,
        clientCode: response.data.client_code
      });
    } else {
      return res
        .status(401)
        .json({ error: response.data.emsg || "Token generation failed" });
    }
  } catch (error) {
    console.error("Token exchange error:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to exchange request_code for token" });
  }
});

module.exports = router;
