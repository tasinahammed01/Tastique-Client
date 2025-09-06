import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  console.log(blog)

  useEffect(() => {
    // Fetch single blog
    fetch(`http://localhost:5000/allblogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));

    // Fetch recent blogs
    fetch(`http://localhost:5000/allblogs`)
      .then((res) => res.json())
      .then((data) => setRecentBlogs(data.slice(0, 3))); 
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      name,
      comment,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(`http://localhost:5000/blogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) throw new Error("Failed to submit comment");

      // Merge new comment without removing blog data
      setBlog((prev) => {
        if (!prev) return prev; // If blog not loaded yet, do nothing
        return {
          ...prev,
          comments: [...(prev.comments || []), newComment],
        };
      });

      setComment("");
      setName("");
    } catch (error) {
      console.error(error);
    }
  };

  if (!blog) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Blog Details */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          Posted by <span className="font-semibold">{blog.postedBy}</span> •{" "}
          {new Date(blog.date).toLocaleDateString()}
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-2xl w-full mb-6"
          />
        )}

        <p className="text-lg  leading-relaxed mb-10">
          {blog.description}
        </p>

        {/* Comments */}
        <h2 className="text-2xl font-semibold mb-4 ">Comments</h2>
        <div className="space-y-4 mb-6">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((c, i) => (
              <div key={i} className="p-4  rounded-xl shadow-sm bg-neutral">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(c.date).toLocaleString()}
                </p>
                <p className="mt-2">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          )}
        </div>

        {/* Add Comment */}
        <form
          onSubmit={handleCommentSubmit}
          className="p-4 bg-neutral rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-3">Leave a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg mb-3"
          />
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg mb-3 h-24"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Comment
          </button>
        </form>
      </div>

      {/* Right Column: Recent Blogs */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Recent Blogs</h3>
        {recentBlogs.map((b) => (
          <div
            key={b._id}
            onClick={() => navigate(`/blogs/${b._id}`)}
            className="cursor-pointer bg-neutral p-4 rounded-lg shadow hover:shadow-md transition duration-300"
          >
            {b.image && (
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}
            <h4 className="text-lg font-semibold">{b.title}</h4>
            <p className="text-sm text-gray-500">
              {new Date(b.date).toLocaleDateString()}
            </p>
            <hr className="my-2"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBlog;
