import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearError } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!email || !password) return;

    try {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange text-white p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg">
        {/* Left Section - Welcome Text */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-700 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <h1 className="text-3xl md:text-5xl font-inter text-green text-center md:text-left">
            Welcome to Login
          </h1>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 bg-gray-700 p-8 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <h2 className="text-4xl text-green font-inter text-center mb-6">Login</h2>

          {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-inter text-left">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-400 rounded bg-white text-black"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-inter text-left">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-400 rounded bg-white text-black"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green text-white hover:bg-green-100 py-3 rounded-lg transition-all font-inter"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center font-inter">
            Don't have an account? <Link to="/register" className="text-orange hover:text-yellow">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
