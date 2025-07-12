import { useNavigate, useLocation, Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import API from "../axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useDarkMode();
  const { user, setUser, fetchUser } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    fetchUser();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center z-50">
      <Link to="/" className="text-xl font-bold text-blue-700 dark:text-white">
        TaskMaster
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link
          to="/about"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium transition"
        >
          About
        </Link>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-700 dark:text-white font-medium"
            >
              {user.name || "User"} <span>⌄</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow rounded w-40 z-10">
                <Link
                  to="/home"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="text-gray-700 dark:text-gray-300"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={toggleMobileMenu}
          className="text-gray-700 dark:text-gray-300"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 px-6 py-4 shadow-md md:hidden space-y-3 z-40"
        >
          <Link
            to="/about"
            onClick={toggleMobileMenu}
            className="block text-gray-700 dark:text-white"
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                to="/home"
                onClick={toggleMobileMenu}
                className="block text-gray-700 dark:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="block w-full text-left text-gray-700 dark:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMobileMenu}
                className="block text-gray-700 dark:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMobileMenu}
                className="block text-gray-700 dark:text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
