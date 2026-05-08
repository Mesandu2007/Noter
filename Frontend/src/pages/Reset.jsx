import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { resetPassword } from "../../services/apiService";
import Footer from "../components/Footer";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password || form.password.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await resetPassword(token, { password: form.password });
      setMessage(res.data.msg || "Password reset successful!");
      
      // Redirect to login after a short delay so the user can see the success message
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.msg || "Reset failed. Link might be expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">

      {/* CENTER */}
      <div className="flex-grow flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">

          <h1 className="text-2xl font-bold text-white text-center">
            🔒 Reset Password
          </h1>

          <p className="text-gray-400 text-sm text-center mt-2 mb-6">
            Please enter your new password below.
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-400 text-xs mb-4 text-center">
                {error}
              </p>
            )}
            {message && (
              <p className="text-green-400 text-xs mb-4 text-center">
                {message}
              </p>
            )}

            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 mb-3 rounded bg-slate-700 text-white"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
              required
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />

            <button 
              disabled={loading}
              className={`w-full ${loading ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} p-3 rounded text-white font-medium transition`}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-5">
            <Link to="/" className="text-blue-400 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}