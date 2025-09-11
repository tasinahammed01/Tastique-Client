import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useCart } from "../Provider/CartContext";
import { getBookmarks, toggleBookmark, isBookmarked } from "../utils/localStorage";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Swal from "sweetalert2";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { addToCart } = useCart();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch("https://testique-backend.onrender.com/allfoods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
      });
  }, []);

  // Load bookmarks on mount
  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  useEffect(() => {
    let filtered = [...foods];
    if (category !== "All")
      filtered = filtered.filter((f) => f.category === category);
    if (search)
      filtered = filtered.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredFoods(filtered);
  }, [search, category, foods]);

  const categories = ["All", ...new Set(foods.map((f) => f.category))];

  // Handle adding food to cart
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

  const handleToggleBookmark = (food) => {
    const updated = toggleBookmark(bookmarks, food);
    setBookmarks(updated);
    const marked = isBookmarked(updated, food._id || food.id);
    Swal.fire({
      icon: marked ? "success" : "info",
      title: marked ? "Bookmarked" : "Removed",
      text: marked
        ? `${food.name} has been bookmarked!`
        : `${food.name} removed from bookmarks.`,
      showConfirmButton: false,
      timer: 1200,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
        Our Menu
      </h1>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full border ${
                category === cat
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-gray-700 border-accent"
              } hover:bg-accent hover:text-white transition`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search food..."
          className="px-4 py-2 border rounded-full w-full md:w-64 outline-none border-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="relative bg-neutral rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-[250px] object-cover">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {food.category}
              </span>
              {food.populer ? (
                <span className="absolute top-3 right-20 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  populer
                </span>
              ) : (
                ""
              )}

              {/* Bookmark Icon */}
              <button
                onClick={() => handleToggleBookmark(food)}
                className="absolute top-3 left-4 cursor-pointer text-white text-xl"
                aria-label="Toggle Bookmark"
              >
                {isBookmarked(bookmarks, food._id || food.id) ? (
                  <FaBookmark className="text-yellow-400 drop-shadow-md" />
                ) : (
                  <FaRegBookmark className="text-gray-200 drop-shadow-md" />
                )}
              </button>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-3 flex-grow">
              <h2 className="text-xl font-bold">{food.name}</h2>
              <p className="text-sm line-clamp-3">{food.description}</p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-indigo-600 font-bold text-lg">
                  ${food.price.toFixed(2)}
                </span>
                {food.available ? (
                  <span className="text-green-500 font-semibold text-sm">
                    Available
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold text-sm">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-col gap-3 xl:flex-row">
                <motion.button 
                  onClick={() => handleAddToCart(food)}
                  className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 px-5 py-2 rounded-full font-medium transition-colors"
                >
                  Add to Cart
                </motion.button>
                <Link to={`/menu/${food._id}`}>
                  <motion.button className="w-full xl:w-auto cursor-pointer text-accent hover:text-white border border-accent px-5 py-2 rounded-full font-medium hover:bg-accent/90 transition-colors">
                    See Details
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredFoods.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No foods found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
