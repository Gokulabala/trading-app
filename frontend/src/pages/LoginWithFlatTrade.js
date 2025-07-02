import React from "react";

const LoginWithFlatTrade = () => {
  const CLIENT_ID = "YOUR_CLIENT_ID"; // Replace with your Flat Trade client ID
  const REDIRECT_URI = "http://localhost:3000/callback"; // Must match the redirect URL you specified

  const handleLogin = () => {
    const oauthURL = `https://api.flat.trade/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = oauthURL;
  };

  return (
    <div>
      <h1>Login with Flat Trade</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginWithFlatTrade;
