import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="
          text-2xl
          font-black
          bg-gradient-to-r
          from-cyan-400
          via-purple-400
          to-pink-400
          bg-clip-text
          text-transparent
          "
        >
          ExamCopilot AI
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-slate-300 hover:text-white transition">
            Home
          </Link>
          <Link to="/syllabus-upload" className="text-slate-300 hover:text-white transition">
            Syllabus
          </Link>
          <Link to="/question-paper" className="text-slate-300 hover:text-white transition">
            Papers
          </Link>
          <Link to="/study-planner" className="text-slate-300 hover:text-white transition">
            Planner
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-xl">

          <Link
            to="/"
            className="block px-6 py-4 text-slate-300"
          >
            Home
          </Link>

          <Link
            to="/syllabus-upload"
            className="block px-6 py-4 text-slate-300"
          >
            Syllabus
          </Link>

          <Link
            to="/question-paper"
            className="block px-6 py-4 text-slate-300"
          >
            Papers
          </Link>

          <Link
            to="/study-planner"
            className="block px-6 py-4 text-slate-300"
          >
            Planner
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;