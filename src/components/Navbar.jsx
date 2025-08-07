import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // existing state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // new search state
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef(null);

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  // toggles
  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const toggleDropdown = () => setIsDropdownOpen((open) => !open);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-yellow-500 shadow-md sticky top-0 z-50 font-inter">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-inter text-darkGreen tracking-wider glow-text"
          >
            🐔Agrify
          </Link>

          {/* Desktop: Search + Links */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <FaSearch
                size={20}
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green"
              />
          
            </form>

            <Link
              to="/products"
              className="text-green hover:text-yellow-500 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-green hover:text-yellow-500 transition-colors"
            >
              🛒Cart
            </Link>

            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-green hover:text-yellow-500 transition flex items-center space-x-2"
                >
                  <span>{user.name}</span>
                  <svg
                    className={`w-4 h-4 ${
                      isDropdownOpen ? "rotate-180" : ""
                    } transition-transform`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-yellow-500 rounded-lg shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-black hover:bg-yellow-900"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-black hover:bg-yellow-900"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-yellow-900"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green hover:bg-orange px-4 py-2 rounded-md text-white text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile: Search icon + Hamburger */}
          <div className="md:hidden flex items-center">
            <FaSearch
              size={20}
              onClick={() => setIsSearchOpen((open) => !open)}
              className="text-green mr-4"
            />


            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </form>
            )}

            <button onClick={toggleMenu} className="text-yellow-400 ml-4">
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-3 bg-white border-t border-yellow-500">
          <Link to="/products" className="block text-black hover:bg-yellow">
            Products
          </Link>
          <Link to="/cart" className="block text-black hover:bg-yellow">
            Cart
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="block text-black hover:bg-yellow">
                Profile
              </Link>
              <Link to="/settings" className="block text-black hover:bg-yellow">
                Settings
              </Link>
              <button onClick={handleLogout} className="block text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block text-yellow bg-green">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
