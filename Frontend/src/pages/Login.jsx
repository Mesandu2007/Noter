import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { loginUser } from "../../services/apiService";

export default function Login() {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err) {
      // This will capture Network Errors (backend down) or server-side error messages
      setError(err.response?.data?.msg || "Cannot connect to server. Is the backend running?");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">

      {/* CENTER */}
      <div className="flex-grow flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center">
            📝 NotesApp
          </h1>

          <p className="text-gray-400 text-sm text-center mt-2 mb-6">
            Sign in to access your personal notes anytime.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {error && (
              <p className="text-red-400 text-xs mb-4 text-center">
                {error}
              </p>
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 rounded bg-slate-700 text-white"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* PASSWORD + TOGGLE */}
            <div className="relative mb-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded bg-slate-700 text-white pr-10"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-300 hover:text-white"
              >
                {showPassword ? "🙈" : "👁"}
              </button>

            </div>

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* LOGIN */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-medium">
              Login
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-600"></div>
            <p className="text-gray-400 text-sm mx-3">OR</p>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white text-black p-3 rounded hover:bg-gray-200 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </button>

          {/* REGISTER LINK */}
          <p className="text-sm text-gray-400 text-center mt-5">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}