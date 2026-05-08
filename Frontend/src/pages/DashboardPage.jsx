import { useEffect, useState } from "react";
import { getNotes } from "../../services/apiService";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getNotes();
        setNotes(res.data);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };
    load();
  }, []);

  const total = notes.length;
  const pinned = notes.filter((n) => n.isPinned).length;
  const favorites = notes.filter((n) => n.isFavorite).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-white text-xl font-bold">
          📊 Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <Link to="/notes" className="text-blue-400 text-sm">
            Go to Notes →
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="flex-grow px-4 mt-6">

        <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">

          <div className="bg-slate-800 p-6 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Total</p>
            <h2 className="text-white text-3xl">{total}</h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Pinned</p>
            <h2 className="text-yellow-400 text-3xl">{pinned}</h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Favorites</p>
            <h2 className="text-green-400 text-3xl">{favorites}</h2>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}