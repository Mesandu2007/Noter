# 📝 Noter – MERN Stack Notes Application

A modern full-stack Notes Management App built using the MERN stack.  
Users can securely create and organize notes with authentication, pinning, favorites, and filtering.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login (JWT-based)
- Protected routes
- Forgot Password & Reset Password

### 📝 Notes Management
- Create notes
- View all notes
- Update notes
- Delete notes

### ⭐ Advanced Features
- 📌 Pin / Unpin notes
- ❤️ Mark as Favorite
- 🔍 Search notes
- 🎯 Filter (All / Pinned / Favorites)

### 📱 UI / UX
- Responsive design (mobile + desktop)
- Modal-based forms
- Clean dashboard layout

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Tokens)
- bcrypt.js

---

## 📁 Project Structure


Noter/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── pages/
│ ├── components/
│ └── services/


---

## 🔌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint | Description |
|-------|---------|------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/forgot-password | Send reset email |
| POST | /api/auth/reset-password/:token | Reset password |

---

### 📝 Notes Routes

| Method | Endpoint | Description |
|-------|---------|------------|
| GET | /api/notes | Get all notes |
| POST | /api/notes | Create note |
| PUT | /api/notes/:id | Update note |
| DELETE | /api/notes/:id | Delete note |
| PATCH | /api/notes/:id/pin | Toggle pin |
| PATCH | /api/notes/:id/favorite | Toggle favorite |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/noter.git
cd noter
2️⃣ Backend Setup
cd backend
npm install

Create .env:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key


Author: Mesandu Gunarwardhana






