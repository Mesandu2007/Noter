import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  getNotes, 
  createNote, 
  updateNote, 
  deleteNote, 
  togglePin, 
  toggleFavorite 
} from "../../services/apiService";

import NoteCard from "../components/NoteCard";
import NoteModalForm from "../components/NoteModalForm";
import Footer from "../components/Footer";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const navigate = useNavigate();

  const loadNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error("Error connecting to the backend:", err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // CREATE / UPDATE
  const handleSubmit = async (form, id) => {
    if (id) {
      await updateNote(id, form);
      setEditNote(null);
    } else {
      await createNote(form);
    }
    loadNotes();
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

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded text-white text-sm"
          >
            Logout
          </button>
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
              onDelete={(id) => deleteNote(id).then(loadNotes)}
              onPin={(id) => togglePin(id).then(loadNotes)}
              onFavorite={(id) => toggleFavorite(id).then(loadNotes)}
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