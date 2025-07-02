import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const authorizationCode = params.get("code"); // Extract authorization code from URL

      if (authorizationCode) {
        try {
          const response = await axios.post("http://localhost:5000/api/token", {
            code: authorizationCode,
          });

          localStorage.setItem(
            "flatTradeAccessToken",
            response.data.accessToken
          );
          navigate("/dashboard");
        } catch (error) {
          console.error("Error exchanging authorization code:", error.message);
        }
      } else {
        console.error("Authorization code not found in URL.");
      }
    };

    handleCallback();
  }, [navigate]);

  return <p>Processing authentication...</p>;
};

export default Callback;
