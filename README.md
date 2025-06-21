# 🐔 Agrify – eCommerce Poultry Platform

**Agrify** is a modern eCommerce platform built for the poultry industry. It connects poultry farmers and buyers through a seamless, responsive interface where users can explore, order, and manage poultry products in real-time.

---

## 🚀 Live Demo

🌐 **[View Live Demo](https://agrific.netlify.app/)**

---

| Homepage | Product Page |
|----------|--------------|
| ![Homepage](screenshots/homepage.png) | ![Product Page](screenshots/product.png) |

---

## ✨ Key Features

- 🛒 User-friendly product browsing & shopping cart
- 📦 Order management system with status tracking
- 🧑‍💼 Admin dashboard to manage products, users, and orders
- 🔐 Secure user authentication (JWT)
- 💳 Payment integration via Stripe or Paystack
- 📨 Email notifications on order events
- 🌩️ Cloudinary integration for product images

---

## 🧰 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Axios
- Framer Motion *(optional for animations)*

### 🔸 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stripe/Paystack API
- Nodemailer

---

## ⚙️ Local Setup

1. **Clone the repository**

```bash

git clone https://github.com/Co-den/e-commerce-updated.git
cd agrify

//FRONTEND
cd frontend
npm install
npm run dev

//BACKEND
cd ../backend
npm install
npm run dev


agrify/
├── frontend/          # React frontend
│   └── src/
├── backend/           # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── utils/
├── screenshots/       # App screenshots
└── README.md
