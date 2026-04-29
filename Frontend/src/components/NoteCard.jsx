export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onPin,
  onFavorite,
}) {
  return (
    <div className={`relative bg-slate-800 p-4 rounded-xl ${
      note.isPinned ? "border-2 border-yellow-500 shadow-lg" : ""
    }`}>

      {note.isPinned && (
        <span className="absolute top-2 right-2 text-yellow-400 text-xl">📌</span>
      )}

      <h2 className="text-white font-bold pr-8">{note.title}</h2>

      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
        {note.content}
      </p>

      <div className="flex gap-2 mt-4 flex-wrap">

        <button onClick={() => onEdit(note)} className="bg-purple-500 px-2 py-1 rounded text-sm text-white">
          EDIT
        </button>

        <button onClick={() => onPin(note._id)} className="bg-yellow-500 px-2 py-1 rounded text-sm text-white">
          {note.isPinned ? "UNPIN" : "PIN"}
        </button>

        <button onClick={() => onFavorite(note._id)} className="bg-green-500 px-2 py-1 rounded text-sm text-white">
          {note.isFavorite ? "UNFAVOURITE" : "FAVOURITE"}
        </button>

        <button onClick={() => onDelete(note._id)} className="bg-red-500 px-2 py-1 rounded text-sm text-white">
          DELETE
        </button>

      </div>

    </div>
  );
}