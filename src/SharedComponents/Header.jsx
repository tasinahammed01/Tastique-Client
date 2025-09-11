import React, { useState, useEffect, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSun, FaMoon, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Provider/CartContext";
import { AuthContext } from "../Provider/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const { cartCount } = useCart();

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const user = auth?.user;

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = useCallback(async () => {
    try {
      if (auth?.signOutUser) {
        await auth.signOutUser();
        setIsOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [auth, navigate]);

  // Set nav links dynamically
  useEffect(() => {
    const links = [
      { name: "Home", path: "/" },
      { name: "Menu", path: "/menu" },
      { name: "Reservation", path: "/reservation" },
      { name: "Blogs", path: "/blogs" },
      { name: "Contact", path: "/contact" },
      { name: "About", path: "/about" },
      { name: "Gallery", path: "/gallery" },
    ];

    // Add Dashboard only if user exists
    if (user) {
      links.push({
        name: "Dashboard",
        path: user.role === "admin" ? "/dashboard/admin/users" : "/dashboard/customer/orders",
      });
    }

    setNavLinks(links);
  }, [user]);

  return (
    <header className="sticky top-0 left-0 w-full backdrop-blur-md shadow-md z-50 border-b transition-colors duration-500 bg-base-100 dark:bg-base-100 border-neutral dark:border-neutral">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link to="/">
          <img
            className="w-16"
            src="https://i.ibb.co/V0dc4xBb/Screenshot-656-removebg-preview.png"
            alt="Foodie Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center font-medium">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={link.path}>{link.name}</Link>
            </motion.div>
          ))}

          {/* Only Logout button */}
          {user && (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              className="ml-2 font-medium hover:underline"
            >
              Logout
            </motion.button>
          )}
          {!user && (
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="ml-2 font-medium hover:underline"
              >
                Login/Register
              </motion.button>
            </Link>
          )}

          {/* Cart */}
          <div className="relative ml-4 text-2xl cursor-pointer">
            <Link to="/cart">
              <FaShoppingCart />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="ml-4 text-xl">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </nav>

        {/* Mobile Hamburger + Theme */}
        <div className="flex items-center lg:hidden space-x-4">
          {/* Theme toggle */}
          <button onClick={toggleTheme} className="text-xl">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* Cart */}
          <div className="relative text-2xl cursor-pointer">
            <Link to="/cart">
              <FaShoppingCart />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>

          {/* Hamburger */}
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden shadow-md backdrop-blur-md bg-base-100 dark:bg-base-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex h-screen justify-center flex-col items-center space-y-8 font-medium">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}

              {/* Only Logout button */}
              {user && (
                <motion.li whileHover={{ scale: 1.05 }}>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-lg font-medium hover:underline"
                  >
                    Logout
                  </button>
                </motion.li>
              )}
              {!user && (
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="ml-2 font-medium hover:underline"
                  >
                    Login/Register
                  </motion.button>
                </Link>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
