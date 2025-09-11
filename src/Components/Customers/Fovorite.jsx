import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useCart } from "../../Provider/CartContext";
import { getBookmarks, saveBookmarks } from "../../utils/localStorage";
import { FaBookmark, FaTrash } from "react-icons/fa";

const Favorite = () => {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    setFavorites(getBookmarks());
  }, []);

  // Add to cart
  const handleAddToCart = (food) => {
    addToCart(food);
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${food.name} has been added to your cart!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: "top-end",
    });
  };

  // Remove bookmark
  const handleRemoveBookmark = (id) => {
    const updatedFavorites = favorites.filter(
      (food) => (food.id || food._id) !== id
    );
    saveBookmarks(updatedFavorites);
    setFavorites(updatedFavorites);

    Swal.fire({
      icon: "info",
      title: "Removed",
      text: "Item removed from favorites!",
      timer: 1200,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
    });
  };

  return (
    <div className="py-14 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-40">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-rose-500 p-[1px] mb-10">
        <div className="rounded-3xl bg-neutral/70 backdrop-blur-sm px-6 sm:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center gap-3">
                <FaBookmark className="text-yellow-300" />
                Your Favorites
              </h2>
              <p className="mt-2 text-sm sm:text-base ">
                Quickly revisit dishes you love. Bookmarks sync across Home and Menu.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider ">Total</span>
              <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-lg font-semibold">
                {favorites.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28">
          <FaBookmark className="text-5xl sm:text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Explore our Menu and tap the bookmark icon to save items here.
          </p>
          <Link to="/menu">
            <motion.button
              className="cursor-pointer text-white bg-accent hover:bg-accent/90 px-6 py-3 rounded-full font-medium transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              Browse Menu
            </motion.button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-8">
          {favorites.map((food, index) => (
            <motion.div
              key={index}
              className="group relative bg-neutral rounded-3xl shadow-lg overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Image */}
              <div className="relative h-[240px] sm:h-[260px] md:h-[280px]">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-md">
                  {food.category}
                </span>
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveBookmark(food._id || food.id)}
                  className="absolute top-3 left-3 text-white/90 hover:text-white bg-black/30 hover:bg-black/40 rounded-full p-2 transition"
                  aria-label="Remove from favorites"
                >
                  <FaTrash />
                </button>
                {/* Price Chip */}
                <span className="absolute bottom-3 left-3 bg-white/90 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full shadow">
                  ${food.price.toFixed(2)}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-bold group-hover:text-accent transition-colors">
                  {food.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 min-h-[54px]">
                  {food.description}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  {food.available ? (
                    <span className="text-green-500 font-semibold text-xs sm:text-sm">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold text-xs sm:text-sm">
                      Sold Out
                    </span>
                  )}
                  <Link to={`/menu/${food._id || food.id}`} className="text-xs sm:text-sm text-accent hover:underline">
                    See details
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.button
                    onClick={() => handleAddToCart(food)}
                    className="cursor-pointer text-white bg-accent hover:bg-accent/90 px-5 py-2 rounded-full font-medium transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    onClick={() => handleRemoveBookmark(food._id || food.id)}
                    className="cursor-pointer text-red-500 border border-red-500 px-5 py-2 rounded-full font-medium hover:bg-red-500 hover:text-white transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
