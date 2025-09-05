import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const images = [
  "https://i.ibb.co.com/tpCD854y/Screenshot-654.png",
  "https://i.ibb.co.com/rRHCYmKn/Screenshot-655.png",
  "https://i.ibb.co.com/DfK6J6YL/Screenshot-653.png",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[60vh]  md:h-[50vh] lg:h-[90vh] overflow-hidden">
      {/* Images */}
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={images[current]}
          alt={`Slide ${current}`}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Black Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Hero Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4  md:px-18">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="titleFont">Welcome</span>
          <br/>
          <span>Testique Restaurant</span>
        </motion.h1>
        <motion.p
          className="text-white text-sm  md:text-xl mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Enjoy the best dishes crafted with love and fresh ingredients.
        </motion.p>
        <Link to="/">
          <motion.button
            className="bg-primary cursor-pointer text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Reserve Now
          </motion.button>
        </Link>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-primary transition-colors hidden md:flex"
      >
        <FaAngleLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-primary transition-colors hidden md:flex"
      >
        <FaAngleRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center space-x-3">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              index === current ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
