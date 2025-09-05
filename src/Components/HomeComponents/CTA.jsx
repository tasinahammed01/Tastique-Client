import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute  top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
          height: "100%",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 sm:px-12"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Discover the Taste of Magic
        </h2>
        <p className="text-white/90 sm:text-lg lg:text-xl mb-6">
          Join us and explore delicious foods delivered fresh to your doorstep.
        </p>
        <motion.a
          href="/menu"
          className="inline-block bg-accent text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full font-medium hover:bg-accent/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Order Now
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CTA;
