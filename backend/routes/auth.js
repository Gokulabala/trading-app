const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();
const CLIENT_ID = process.env.FLAT_TRADE_CLIENT_ID; // Replace with your Flat Trade client ID
const CLIENT_SECRET = process.env.FLAT_TRADE_CLIENT_SECRET; // Replace with your Flat Trade client secret
const REDIRECT_URI = "http://localhost:3000/callback"; // Must match the redirect URL in Flat Trade

// Route: Redirect user to Flat Trade's OAuth login page
router.get("/login", (req, res) => {
  const oauthURL = `https://api.flat.trade/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  res.redirect(oauthURL); // Redirect the user to Flat Trade's login page
});

// Route: Exchange authorization code for access token
router.post("/token", async (req, res) => {
  const { code } = req.body; // Authorization code sent from the frontend

  try {
    const response = await axios.post("https://api.flat.trade/oauth/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
      code: code,
    });

    res.json({ accessToken: response.data.access_token }); // Send access token back to the frontend
  } catch (error) {
    console.error("Error exchanging authorization code:", error.message);
    res
      .status(500)
      .json({
        error: "Failed to exchange authorization code for access token.",
      });
  }
});

module.exports = router;
