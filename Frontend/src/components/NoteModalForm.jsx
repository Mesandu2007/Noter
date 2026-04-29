import { useEffect, useState } from "react";

export default function NoteModalForm({
  onClose,
  onSubmit,
  editNote,
}) {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // 🔥 Load data when editing
  useEffect(() => {
    if (editNote) {
      setForm({
        title: editNote.title || "",
        content: editNote.content || "",
      });
    } else {
      setForm({
        title: "",
        content: "",
      });
    }
  }, [editNote]);

  // 📝 Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return; // simple validation

    onSubmit(form, editNote?._id); // id only exists in edit mode
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">

      <div className="bg-slate-800 w-full max-w-md p-6 rounded-xl shadow-lg">

        {/* TITLE */}
        <h2 className="text-white text-xl font-bold mb-4 text-center">
          {editNote ? "✏ Update Note" : "➕ Add Note"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* TITLE INPUT */}
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full p-3 mb-3 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* CONTENT INPUT */}
          <textarea
            placeholder="Write your note..."
            rows="4"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            className="w-full p-3 mb-4 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* BUTTONS */}
          <div className="flex gap-2">

            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-medium"
            >
              {editNote ? "Update Note" : "Add Note"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded text-white"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}