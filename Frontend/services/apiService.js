import axios from "axios";

// 🔗 BASE URL (your backend)
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Corrected to match the backend port (likely 3000)
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// =============================
// 🔐 AUTH APIs
// =============================

// REGISTER
export const registerUser = (data) =>
  API.post("/auth/register", data);

// LOGIN
export const loginUser = (data) =>
  API.post("/auth/login", data);

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (token, data) =>
  API.post(`/auth/reset-password/${token}`, data);


// =============================
// 📝 NOTES APIs
// =============================

// GET ALL NOTES
export const getNotes = () =>
  API.get("/notes");

// CREATE NOTE
export const createNote = (data) =>
  API.post("/notes", data);

// UPDATE NOTE
export const updateNote = (id, data) =>
  API.put(`/notes/${id}`, data);

// DELETE NOTE
export const deleteNote = (id) =>
  API.delete(`/notes/${id}`);

// TOGGLE PIN
export const togglePin = (id) =>
  API.patch(`/notes/${id}/pin`);

// TOGGLE FAVORITE
export const toggleFavorite = (id) =>
  API.patch(`/notes/${id}/favorite`);