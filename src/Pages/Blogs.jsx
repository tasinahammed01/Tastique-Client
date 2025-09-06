import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/allblogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, []);

  const truncateDescription = (desc, wordLimit = 25) => {
    const words = desc.split(" ");
    return words.length <= wordLimit
      ? desc
      : words.slice(0, wordLimit).join(" ") + "...";
  };

  if (loading) {
    return <div className="text-center py-10">Loading blogs...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
        <img
          src="https://i.ibb.co/rRHCYmKn/Screenshot-655.png"
          alt="Blog Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Our Blog
          </h1>
        </div>
      </div>

      {/* Blog List */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            key={blog._id}
            className="cursor-pointer bg-neutral  rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 overflow-hidden"
          >
            {/* Blog Image */}
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Blog Content */}
            <div className="p-5">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 line-clamp-2">
                {blog.title}
              </h2>
              <div className="text-xs sm:text-sm  mb-3">
                By {blog.postedBy} | {blog.date}
              </div>
              <p className=" text-sm md:text-base">
                {truncateDescription(blog.description)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
