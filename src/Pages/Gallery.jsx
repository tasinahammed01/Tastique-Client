import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://testique-backend.onrender.com/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-20">Gallery</h2>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg break-inside-avoid cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.img
              src={img.url}
              alt={img.title}
              className="w-full object-cover rounded-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
