export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-center p-3 text-gray-400 text-sm">
      © {new Date().getFullYear()} NotesApp
    </footer>
  );
}