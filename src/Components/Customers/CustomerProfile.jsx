import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const CustomerProfile = () => {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch user from API based on email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://testique-backend.onrender.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");

        const users = await res.json();
        const currentUser = users.find((u) => u.email === user.email);

        if (currentUser) {
          setUserId(currentUser._id);
          setFormData({
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
            address: currentUser.address,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.email) fetchUser();
  }, [user?.email]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://testique-backend.onrender.com/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");


      setEditMode(false);
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update profile!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:p-6">
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-8">My Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["name", "email", "phone", "address"].map((field) => (
            <div className="flex flex-col" key={field}>
              <label className="font-medium mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                disabled={field === "email" || !editMode} // email is read-only
                className={`p-3 border rounded-lg focus:outline-none transition ${
                  editMode && field !== "email"
                    ? "ring-2 ring-blue-400"
                    : "bg-gray-50 text-black"
                } ${field === "email" ? "cursor-not-allowed bg-gray-100" : ""}`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 rounded-lg border border-gray-300 hover:shadow-md transition"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:shadow-md transition"
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:shadow-md transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
