import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import Lottie from "lottie-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://lottie.host/203cfff8-f15b-45fb-935f-41b9c5d9d0db/BnDVtJSv59.json"
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      if (!auth?.signInUser) {
        setError("Authentication service not available");
        return;
      }

      await auth.signInUser(data.email, data.password);

      Swal.fire("Success", "Logged in successfully", "success");

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      Swal.fire("Error", err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-10 gap-10 bg-neutral">
      {animationData && (
        <div className="w-full md:w-1/2 max-w-lg">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}

      <div className="w-full md:w-1/2 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-base-100 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/70 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

        <Link
          to="/register"
          className="mt-4 text-accent hover:underline font-medium"
        >
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
