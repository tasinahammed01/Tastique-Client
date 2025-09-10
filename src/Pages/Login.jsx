import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthContext";
import Lottie from "lottie-react";

const Login = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [animationData, setAnimationData] = useState(null);

  // Fetch Lottie JSON for Login
  useEffect(() => {
    fetch("https://assets7.lottiefiles.com/packages/lf20_ikvz3x3v.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password);
    if (res.success) {
      Swal.fire("Success", "Logged in successfully", "success");
      if (res.user?.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } else {
      Swal.fire("Error", res.message, "error");
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

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 max-w-md p-8 rounded-2xl shadow-lg bg-base-100"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <input
          {...formRegister("email", { required: true })}
          placeholder="Email"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">Email is required</p>
        )}

        <input
          {...formRegister("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">Password is required</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/70 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
