import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router";
import { useCart } from "../Provider/CartContext";
import Swal from "sweetalert2";

const SingleMenu = () => {
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { addToCart } = useCart();

  const { id } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`http://localhost:5000/allfoods/${id}`);
        if (!res.ok) throw new Error("Failed to fetch food");
        const data = await res.json();
        setFood(data);
        setComments(data.comments || []);
      } catch (err) {
        console.error("Error fetching food:", err);
        alert("Error fetching food. Please try again later.");
      }
    };

    fetchFood();
  }, [id]);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  // Handle adding food to cart with quantity
  const handleAddToCart = () => {
    if (food) {
      addToCart({ ...food, quantity });
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${food.name} (${quantity}x) has been added to your cart!`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top-end",
      });
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const commentData = {
      name: "Anonymous",
      text: newComment,
      date: new Date().toLocaleString(),
      replies: [],
    };

    try {
      const res = await fetch(`http://localhost:5000/allfoods/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      setComments([...comments, commentData]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Error adding comment");
    }
  };

  if (!food) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[90%] mx-auto p-6 shadow-lg rounded-lg mt-10"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <motion.img
          src={food.image}
          alt={food.name}
          className="w-full md:w-1/2 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
          <p className="mb-4">{food.description}</p>

          <div className="mb-4 space-y-1">
            <p>
              <span className="font-semibold text-accent">Category:</span>{" "}
              {food.category}
            </p>
            <p>
              <span className="font-semibold text-accent">Available:</span>{" "}
              {food.available ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold text-accent">Tags:</span>{" "}
              {Object.entries(food?.tags || {})
                .filter(([ value]) => value)
                .map(([key]) => key)
                .join(", ") || "None"}
            </p>

            <p className="text-lg font-medium mt-2">
              Total Price: ${(food.price * quantity).toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decrement}
              className="px-3 py-1 border border-accent rounded hover:bg-accent transition"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={increment}
              className="px-3 py-1 border border-accent rounded hover:bg-accent transition"
            >
              +
            </button>
          </div>

          <div className="flex gap-4 mb-8 flex-col xl:flex-row">
            <motion.button 
              onClick={handleAddToCart}
              className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 px-5 py-2 rounded-full font-medium transition-colors"
            >
              Add to Cart
            </motion.button>
            <Link to="/checkout">
              <motion.button className="w-full xl:w-auto cursor-pointer text-white bg-accent hover:bg-accent/90 px-5 py-2 rounded-full font-medium transition-colors">
                Buy Now
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Comments</h2>
        <div className="space-y-4 mb-6">
          {comments.length === 0 && (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          )}
          {comments.map((c, idx) => (
            <div key={idx} className="p-4 bg-neutral rounded-xl shadow-sm">
              <div className="flex gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{c.name}</p>
                  <p className="">{c.text}</p>
                  <p className=" text-sm">{c.date}</p>
                </div>
              </div>
              {/* Replies */}
              {c.replies && c.replies.length > 0 && (
                <div className="ml-16 space-y-2">
                  {c.replies.map((r, ridx) => (
                    <div key={ridx} className="p-2 bg-neutral rounded-lg">
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className=" text-sm">{r.text}</p>
                      <p className="text-gray-400 text-xs">{r.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Comment */}
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleAddComment}
            className="px-5 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition"
          >
            Add Comment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleMenu;
