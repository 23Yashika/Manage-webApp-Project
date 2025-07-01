# 📦 WebSnap - WebApp Management Platform

WebSnap is a full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to manage their favorite web apps in a personalized dashboard—just like Chrome shortcuts, but better and with user profiles!

---

## 🚀 Features

* 🧑 User registration with full name and unique username
* 🔐 Simple username-based login (MongoDB validation, no JWT)
* 👋 Personalized greeting on dashboard ("Hello, Full Name")
* 📎 Add shortcuts to any web apps with name + URL
* 🔍 Real-time search of added shortcuts
* ✏️ Edit shortcut names
* ❌ Delete any shortcut
* 🌈 Funky and catchy UI using Tailwind CSS

---

## 📂 Project Structure

```
Manage-webapps/
├── client/                     # React frontend with Tailwind CSS
│   ├── public/
│   └── src/
│       ├── assets/            # Icons, images
│       ├── components/        # Reusable UI components
│       ├── hooks/             # Custom React hooks (e.g., useAuth)
│       ├── pages/             # Login, Register, Dashboard
│       ├── routes/            # AppRouter using React Router
│       ├── App.js             # Root component
│       └── main.jsx           # Entry file with <BrowserRouter>
├── server/
│   └── src/
│       ├── config/            # MongoDB connection
│       ├── models/            # User & Shortcut Mongoose schemas
│       ├── controllers/       # Business logic (Auth + Shortcuts)
│       ├── routes/            # Express routers
│       └── app.js             # Express app setup
├── server.js                  # Server entry point (uses dotenv)
├── .env                       # Environment variables
├── README.md                  # You're reading it!
```

---

## ⚙️ Tech Stack

* **Frontend:** React + Tailwind CSS + React Router
* **Backend:** Express.js + Node.js
* **Database:** MongoDB + Mongoose

---


## 🧠 How It Works

* **User Authentication:** Registration/login with MongoDB lookup (no JWT)
* **Shortcut Management:** All shortcuts are linked with `userId` and stored in MongoDB
* **UI:** Catchy greetings, profile info, clean card-style layout, real-time shortcut search, and responsive design

---

## 💡 Project Name Meaning

**WebSnap** = Web Shortcuts + Snapshots of your digital life. Quick, customizable, and catchy ✨

---

## ✨ Future Enhancements

* 🌐 Deploy frontend and backend
* 🔒 Add JWT authentication
* 📱 Make it mobile-first responsive
* 🧭 Add drag-and-drop shortcut rearrangement

---

## 👩‍💻 Author

**Yashika** — Full Stack Developer & Builder of Useful Things 💻💡


