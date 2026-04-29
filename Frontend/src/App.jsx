import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgot";
import NotesPage from "./pages/NotesPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/notes" element={<NotesPage/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}