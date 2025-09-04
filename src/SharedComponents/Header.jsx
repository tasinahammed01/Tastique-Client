import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Login/Register", path: "/login" },
  ];

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md border-b border-white/20 dark:border-black/20 z-50 transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <img
          className="w-16"
          src="https://i.ibb.co.com/V0dc4xBb/Screenshot-656-removebg-preview.png"
          alt="Foodie Logo"
        />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center textFont">
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

          {/* Dark/Light Toggle for Desktop */}
          <button
            onClick={toggleTheme}
            className="ml-4 text-xl transition-colors duration-300"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </nav>

        {/* Mobile Hamburger + Dark/Light Toggle */}
        <div className="flex items-center lg:hidden space-x-4">
          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl transition-colors duration-300"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* Hamburger */}
          <button
            className="text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden shadow-md backdrop-blur-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex h-screen justify-center flex-col items-center space-y-8 textFont">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
