📝 Noter – MERN Stack Notes Application

A modern full-stack Notes Management App built using the MERN stack.
Users can securely create, manage, and organize notes with features like authentication, pinning, favorites, and filtering.

🚀 Features
🔐 Authentication
User Registration & Login (JWT-based)
Protected routes
Forgot Password & Reset Password (email-based)
📝 Notes Management
Create notes
View all notes
Update notes
Delete notes
⭐ Advanced Features
📌 Pin / Unpin notes
❤️ Mark as Favorite
🔍 Search notes
🎯 Filter (All / Pinned / Favorites)
📊 UI / UX
Responsive design (mobile + desktop)
Modal-based forms
Clean dashboard layout
🛠️ Tech Stack
Frontend
React (Vite)
Tailwind CSS
Axios
React Router DOM
Backend
Node.js
Express.js
MongoDB (Mongoose)
Authentication
JSON Web Tokens (JWT)
bcrypt.js
📁 Project Structure
Noter/
│
├── backend/
│   ├── controllers/
│   │   ├── noteController.js
│   │   └── authController.js
│   │
│   ├── models/
│   │   ├── Note.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── noteRoutes.js
│   │   └── authRoutes.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│
└── README.md
🔌 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/auth/forgot-password	Send reset email
POST	/api/auth/reset-password/:token	Reset password
📝 Notes Routes
Method	Endpoint	Description
GET	/api/notes	Get all notes
POST	/api/notes	Create note
PUT	/api/notes/:id	Update note
DELETE	/api/notes/:id	Delete note
PATCH	/api/notes/:id/pin	Toggle pin
PATCH	/api/notes/:id/favorite	Toggle favorite
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/noter.git
cd noter
2️⃣ Backend Setup
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🌐 Usage
Register a new account
Login to get access
Create notes
Pin / Favorite important notes
Search and filter notes
🔐 Authentication Flow
Login → JWT Token → Stored in localStorage → Sent in headers → Protected routes
🧠 Key Concepts Used
RESTful API design
JWT Authentication
MVC architecture
React state management
Axios API handling
Protected routes
📸 Screenshots (Optional)

Add screenshots here if you want (Dashboard, Notes page, etc.)

🚀 Future Improvements
📊 Analytics dashboard (charts)
🌙 Dark/Light mode toggle
🔔 Reminder notifications
☁️ Cloud file attachments
👥 Multi-user collaboration
🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request
📄 License

This project is licensed under the MIT License.
