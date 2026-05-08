import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Matches the port and prefix in Login.jsx

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

export const forgotPassword = async (emailData) => {
  return axios.post(`${API_URL}/auth/forgot-password`, emailData);
};

export const resetPassword = async (token, passwordData) => {
  return axios.post(`${API_URL}/auth/reset-password/${token}`, passwordData);
};

export const getNotes = async () => {
  return axios.get(`${API_URL}/notes`, getAuthHeaders());
};

export const getUserProfile = async () => {
  return axios.get(`${API_URL}/auth/profile`, getAuthHeaders());
};

export const createNote = async (noteData) => {
  return axios.post(`${API_URL}/notes`, noteData, getAuthHeaders());
};

export const updateNote = async (id, noteData) => {
  return axios.put(`${API_URL}/notes/${id}`, noteData, getAuthHeaders());
};

export const deleteNote = async (id) => {
  return axios.delete(`${API_URL}/notes/${id}`, getAuthHeaders());
};

export const togglePin = async (id) => {
  return axios.put(`${API_URL}/notes/${id}/toggle-pin`, {}, getAuthHeaders());
};

export const toggleFavorite = async (id) => {
  return axios.put(`${API_URL}/notes/${id}/toggle-favorite`, {}, getAuthHeaders());
};