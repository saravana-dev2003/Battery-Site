import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-1 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-slate-100 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-slate-400"
        : "text-slate-300 hover:text-slate-100"
    }`;

  // 🔐 future-ready role check
  const user = JSON.parse(localStorage.getItem("user")); // { role: "admin" }

  return (
    <nav
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? "shadow-xl" : "shadow-md"
      } bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900`}
    >
      {/* Desktop Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">

        {/* Left (empty spacer or logo later) */}
        <div className="flex items-center">
          {/* Optional logo */}
          {/* <img src="/logo.png" className="h-8" /> */}
        </div>

        {/* Center Site Name */}
        <h1 className="text-lg md:text-xl font-semibold tracking-wide text-slate-100 text-center uppercase">
          Aathi Auto Electricals
        </h1>

        {/* Right Menu */}
        <div className="hidden md:flex justify-end items-center space-x-8">
          <NavLink to="/add" className={linkClass}>
            Add Details
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            Search
          </NavLink>

          {/* 🔐 Admin-only (future use) */}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden absolute right-4 top-4 w-10 h-10 flex flex-col justify-center items-center rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          <span
            className={`w-6 h-0.5 bg-slate-200 transition-all ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-slate-200 my-1 transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-slate-200 transition-all ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-xl bg-slate-800 p-4 space-y-3 shadow-md">
          <NavLink
            to="/add"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Add Details
          </NavLink>

          <NavLink
            to="/search"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Search
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Admin
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
