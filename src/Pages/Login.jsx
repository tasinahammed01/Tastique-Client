// Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthContext";

const Login = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
