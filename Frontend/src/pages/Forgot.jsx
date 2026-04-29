 import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ FIXED
import { forgotPassword } from "../../services/apiService"; // ✅ FIXED PATH
import Footer from "../components/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword({ email }); // ✅ FIXED
      setMessage(res.data.msg || "Reset link sent to your email");
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">

      <div className="flex-grow flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">

          <h1 className="text-2xl font-bold text-white text-center">
            Forgot Password
          </h1>

          <p className="text-gray-400 text-sm text-center mt-2 mb-6">
            Enter your email and we’ll send you a reset link.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-medium">
              Send Reset Link
            </button>

          </form>

          {/* SUCCESS */}
          {message && (
            <p className="text-green-400 text-sm mt-4 text-center">
              {message}
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm mt-4 text-center">
              {error}
            </p>
          )}

          {/* BACK */}
          <p className="text-sm text-gray-400 text-center mt-5">
            Remember your password?{" "}
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
