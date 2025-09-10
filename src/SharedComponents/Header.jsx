import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSun, FaMoon, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../Provider/CartContext";
import { useAuth } from "../Provider/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

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
  };

  // Nav links dynamically update based on user auth
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full backdrop-blur-md shadow-md z-50 border-b transition-colors duration-500 bg-base-100 dark:bg-base-100 border-neutral dark:border-neutral">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link to="/">
          <img
            className="w-16"
            src="https://i.ibb.co.com/V0dc4xBb/Screenshot-656-removebg-preview.png"
            alt="Foodie Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center font-medium">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.a>
          ))}

          {/* Dynamic Auth Links */}
          {user ? (
            <>
              <motion.a
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Dashboard
              </motion.a>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                className="ml-2 font-medium hover:underline"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.a
              href="/register"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Login/Register
            </motion.a>
          )}

          {/* Cart icon with count */}
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

          {/* Dark/Light Toggle */}
          <button onClick={toggleTheme} className="ml-4 text-xl">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </nav>

        {/* Mobile Hamburger + Dark/Light Toggle */}
        <div className="flex items-center lg:hidden space-x-4">
          <button onClick={toggleTheme} className="text-xl">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
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
                  <a
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}

              {user ? (
                <>
                  <motion.li whileHover={{ scale: 1.05 }}>
                    <a
                      href={user.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="text-lg"
                    >
                      Dashboard
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.05 }}>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="text-lg font-medium hover:underline"
                    >
                      Logout
                    </button>
                  </motion.li>
                </>
              ) : (
                <motion.li whileHover={{ scale: 1.05 }}>
                  <a
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-lg"
                  >
                    Login/Register
                  </a>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
