import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  getNotes, 
  createNote, 
  updateNote, 
  deleteNote, 
  togglePin, 
  toggleFavorite,
  getUserProfile
} from "../../services/apiService";

import NoteCard from "../components/NoteCard";
import NoteModalForm from "../components/NoteModalForm";
import Footer from "../components/Footer";

export default function NotesPage({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const loadData = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);

      const userRes = await getUserProfile();
      // Extract data safely regardless of nesting (res.data or res.data.user)
      const userData = userRes.data?.user || userRes.data;
      if (userData) setUser(userData);
    } catch (err) {
      console.error("Error connecting to the backend:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async (form, id) => {
    if (id) {
      await updateNote(id, form);
      setEditNote(null);
    } else {
      await createNote(form);
    }
    loadData();
  };

  // EDIT
  const handleEdit = (note) => {
    setEditNote(note);
    setShowForm(true);
  };

  // FILTER LOGIC
  const filteredNotes = notes
    .filter((note) => {
      const matchSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase());

      if (filter === "pinned") return note.isPinned && matchSearch;
      if (filter === "favorites") return note.isFavorite && matchSearch;

      return matchSearch;
    })
    .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-white text-xl font-bold">📝 Notes</h1>

        <div className="flex gap-3   justify-between items-center">
          <Link to="/dashboard" className="text-blue-400 text-sm">
            Dashboard
          </Link>

          {/* USER PROFILE */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold transition shadow-md"
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-4 z-50">
                <p className="text-white font-semibold truncate">
                  {user?.name || "User Name"}
                </p>
                <p className="text-gray-400 text-sm truncate mb-4">
                  {user?.email || "email@example.com"}
                </p>
                <button
                  onClick={onLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md transition font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOP CONTROLS */}
      <div className="px-6">

        {/* ADD + SEARCH */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">

          <button
            onClick={() => {
              setEditNote(null);
              setShowForm(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            ➕ Add Note
          </button>

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 p-2 rounded bg-slate-800 text-white"
          />

        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pinned", "favorites"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded text-sm ${
                filter === type
                  ? "bg-blue-500 text-white"
                  : "bg-slate-800 text-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

      </div>

      {/* NOTES LIST */}
      <div className="flex-grow px-6 pb-10">

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={(id) => deleteNote(id).then(loadData)}
              onPin={(id) => togglePin(id).then(loadData)}
              onFavorite={(id) => toggleFavorite(id).then(loadData)}
            />
          ))}

        </div>

      </div>

      {/* MODAL */}
      {showForm && (
        <NoteModalForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          editNote={editNote}
        />
      )}

      <Footer />

    </div>
  );
}