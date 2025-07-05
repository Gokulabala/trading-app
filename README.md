# 💹 Zerodha Kite Clone - Trading Dashboard

This project is a **Zerodha Kite-style trading dashboard clone** built with **React** and **Tailwind CSS**. It simulates core functionalities such as:

- 🔐 Login & Registration
- 📊 Dashboard with live stock cards
- 💼 Orders, Holdings, Positions, Bids, and Funds pages
- 💸 Buy/Sell order modals with fund validation
- 🧾 Trade history and localStorage persistence
- 🌓 Light/Dark theme toggle
- 💰 Dummy fund injection and reset support

---

## 🚀 Features

### 🔐 Authentication
- Secure login & register with private route protection

### 📈 Stock Sidebar
- Scrollable list of dummy stock data
- Hover shows quick Buy/Sell & other actions

### 🛒 Buy/Sell Modals
- Center-bottom modal appears when Buy/Sell is clicked
- Limit checks within ±10% of market price
- Trade recorded in localStorage and funds deducted

### 💰 Funds Page
- Shows available margin and cash
- Add dummy ₹10L funds or reset funds to ₹10L
- Fund updates reflected in Buy/Sell modals

### 📑 Orders Page
- Displays trade history from localStorage
- Empty state shown when no orders placed

### 📊 Holdings / Positions / Bids
- Styled UI mimicking Zerodha Kite
- Holdings shown with P&L, day change, etc.
- Positions & Bids simulated with dummy data

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