import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [animationData, setAnimationData] = useState(null);

  // Fetch Lottie JSON from URL
  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      const existingUser = res.data.find((u) => u.email === data.email);

      if (existingUser) {
        Swal.fire("Error", "Email already registered", "error");
        return;
      }

      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "customer",
        cart: [],
        orders: [],
      };

      console.log("New User:", newUser);

      Swal.fire("Success!", "Registration successful", "success");
      navigate("/login");
    } catch (err) {
      Swal.fire("Error", "Registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-10 gap-10 bg-neutral">
      {/* Lottie Animation */}
      {animationData && (
        <div className="w-full md:w-1/2 max-w-lg">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 max-w-md p-8 rounded-2xl shadow-lg bg-base-100"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">Name is required</p>
        )}

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">Email is required</p>
        )}

        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">
            Password must be at least 6 characters
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/70 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
