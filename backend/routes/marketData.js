const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();
const BASE_URL = "https://piconnect.flattrade.in/PiConnectTP/"; // Flat Trade API base URL
const JKEY = process.env.FLAT_TRADE_JKEY; // Your jKey from .env

// Route: Get Index List from Flat Trade API
router.post("/get-index-list", async (req, res) => {
  // Define the payload values
  const jData = JSON.stringify({
    uid: "FT011234",
    exch: "NSE",
  });

  // Prepare the post data with the secret retrieved from the .env file
  const postData = {
    jData: jData,
    jKey: JKEY, // Use the jKey from the environment variable
  };

  try {
    const response = await axios.post(`${BASE_URL}GetIndexList`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching index list:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch index list. Please try again later." });
  }
});

module.exports = router;
