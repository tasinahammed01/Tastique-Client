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

  return (
    <header
      className="sticky top-0 left-0 w-full backdrop-blur-md shadow-md z-50 border-b transition-colors duration-500
      bg-base-100 dark:bg-base-100 border-neutral dark:border-neutral"
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <img
          className="w-16"
          src="https://i.ibb.co.com/V0dc4xBb/Screenshot-656-removebg-preview.png"
          alt="Foodie Logo"
        />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center font-medium">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className=""
            >
              {link.name}
            </motion.a>
          ))}

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 text-xl "
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </nav>

        {/* Mobile Hamburger + Dark/Light Toggle */}
        <div className="flex items-center lg:hidden space-x-4">
          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl "
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* Hamburger */}
          <button
            className="text-2xl "
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
