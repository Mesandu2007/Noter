import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-white font-bold">📝 NotesApp</h1>

        <nav className="hidden md:flex gap-6 text-gray-300 text-sm">
          <Link to="/" className="hover:text-white">Login</Link>
          <Link to="/register" className="hover:text-white">Register</Link>
        </nav>

        <button className="md:hidden text-white" onClick={()=>setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-800 p-4 space-y-2">
          <Link to="/" className="block text-gray-300">Login</Link>
          <Link to="/register" className="block text-gray-300">Register</Link>
        </div>
      )}
    </header>
  );
}