import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  // Load Lottie animation
  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  const onSubmit = async (data) => {
    try {
      // Check if user exists
      const res = await axios.get("http://localhost:5000/users");
      const existingUser = res.data.find((u) => u.email === data.email);
      if (existingUser) {
        Swal.fire("Error", "Email already registered", "error");
        return;
      }

   

      const newUser = {
        name: data.name,
        email: data.email,
        phone: "",
        address: "",
        password: data.password, 
        role: "customer",
        cart: [],
        orders: [],
      };

      // Save user in MongoDB
      const backendResponse = await axios.post(
        "http://localhost:5000/users",
        newUser
      );
      if (backendResponse.status !== 201)
        throw new Error("MongoDB save failed");

      // Save user in Firebase
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      Swal.fire("Success!", "Registration successful", "success");
      navigate("/login");
    } catch (err) {
      console.error(err);
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
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-base-100 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
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

        <Link
          to="/login"
          className="mt-4 text-accent hover:underline font-medium"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
