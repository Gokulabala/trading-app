# 📈 Trading App (Zerodha Kite Clone)

A beginner-friendly trading application built with **React.js**, **Node.js**, **MongoDB**, and **JWT Authentication**. This project simulates a stock trading platform where users can view stock data and securely register/login.

---

## 🚀 Features

### 🔐 Authentication
- Register new users with hashed passwords
- Login with JWT-based session handling
- Persistent user storage in MongoDB
- Auto-redirect on login/register
- Secure token-based route protection

### 📊 Stock Dashboard
- Enter stock symbol and view live market data
- Fetch data using FlatTrade API or mock backend
- Display price, change %, and more
- Error handling for invalid or empty responses

---

## 🛠️ Tech Stack

| Layer        | Technology                        |
|--------------|------------------------------------|
| Frontend     | React.js, Formik, Yup, Axios       |
| Backend      | Node.js, Express.js, JWT, bcrypt   |
| Database     | MongoDB (Mongoose ODM)             |
| Styling      | CSS (with Tailwind support optional)|
| Auth         | JSON Web Tokens (JWT)              |

---
 
## 📂 Folder Structure
trading-app/
```
├── backend/
│ ├── models/ # Mongoose user model
│ ├── routes/ # Auth + API endpoints
│ ├── .env # Environment config
│ ├── index.js # Express server entry
│ └── package.json
├── frontend/
│ ├── public/
│ └── src/
│ ├── pages/ # Login, Register, Dashboard
│ ├── components/ # PrivateRoute, etc.
│ ├── context/ # AuthContext
│ ├── App.js
│ └── index.js
├── .gitignore
└── README.md
```