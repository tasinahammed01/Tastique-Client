import React, { useEffect, useState } from "react";
import TitleSection from "../../SharedComponents/TitleSection";
import { motion } from "motion/react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useCart } from "../../Provider/CartContext";




const PopulerFoods = () => {
  const { addToCart } = useCart();
  const [populerFood, setPopulerFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allfoods")
      .then((res) => res.json())
      .then((data) => {
        setPopulerFoods(data.filter((item) => item.populer === true));
      });
  }, []);

  // handle adding food to cart
  const handleOnClick = (food) => {
    addToCart(food); 
    Swal.fire({
    icon: "success",
    title: "Added to Cart",
    text: `${food.name} has been added to your cart!`,
    showConfirmButton: false,
    timer: 1500, // automatically closes after 1.5s
    toast: true,
    position: "top-end",
  });
  };

  return (
    <div className="py-20 px-4 lg:px-20 2xl:px-40">
      <TitleSection title="Popular Foods" subtitle="Magical Experience" />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        {populerFood.slice(0, 6).map((food, index) => (
          <div
            key={index}
            className="relative bg-neutral rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-[300px] object-cover">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {food.category}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <h3 className="text-xl font-bold">{food.name}</h3>
              <p className="text-sm line-clamp-3">{food.description}</p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
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

              <div className="mt-4 flex flex-col gap-3 xl:flex-row">
                <motion.button
                  onClick={() => handleOnClick(food)}
                  className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 md:px-7 md:py-4 lg:px-5 lg:py-3 xl:px-10 xl:py-3 2xl:px-10 2xl:py-3 px-5 py-2 rounded-full font-medium transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  Add to Cart
                </motion.button>

                <Link to="/">
                  <motion.button
                    className="w-full xl:w-auto cursor-pointer text-accent hover:text-white border border-accent md:px-7 md:py-4 lg:px-5 lg:py-3 xl:px-10 xl:py-3 2xl:px-10 2xl:py-3 px-5 py-2 rounded-full font-medium hover:bg-accent/90 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  >
                    See Details
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Link to="/menu">
          <motion.button
            className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 px-15 py-3  rounded-full font-medium transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            See All Foods
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default PopulerFoods;
