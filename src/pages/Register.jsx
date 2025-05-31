import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, clearError } from "../redux/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || password !== confirmPassword) return;

    try {
      const result = await dispatch(registerUser({ name, email, password }));
      if (registerUser.fulfilled.match(result)) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange text-white p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg">
        {/* Left Section - Welcome Text */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-700 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <h1 className="text-3xl md:text-4xl font-inter text-green text-center md:text-left">
            Welcome to Registration
          </h1>
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full md:w-1/2 bg-gray-700 p-8 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <h2 className="text-2xl font-inter text-center mb-6 text-green">Register</h2>

          {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-3 border border-gray-400 rounded bg-white text-white" />
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-400 rounded bg-white text-white" />
            <input type="password" placeholder="Password" className="w-full p-3 border border-gray-400 rounded bg-white text-white" />
            <input type="password" placeholder="Confirm Password" className="w-full p-3 border border-gray-400 rounded bg-white text-white" />

            <button type="submit" className="w-full bg-green text-white hover:bg-green py-3 rounded-lg transition-all font-inter" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center font-inter">
            Already have an account? <Link to="/login" className="text-orange hover:text-yellow-500 font-inter">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
