export default function NoteControls({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="max-w-4xl mx-auto px-3 mt-6">

      <input
        className="w-full p-3 px-6 rounded bg-slate-800 text-white mb-3"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2 flex-wrap">

        {["all", "pinned", "favorites"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded text-sm ${
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
  );
}