import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send booking data to backend API
    useEffect(()=>{
        axios.post()
        .then((res)=>{
          setBooking(res.data); 
        })
    })
    console.log("Booking Data:", formData);
    alert("Your booking request has been submitted!");
    navigate("/");
  };

  return (
    <div className="bg-yellow-50 min-h-screen py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border-t-4 border-orange"
      >
        <h2 className="text-3xl font-bold text-darkGreen mb-6 text-center">
          Farming Advice Booking
        </h2>
        <p className="text-orange-700 mb-8 text-center font-medium">
          Fill in the form below and our agricultural experts will reach out to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-darkGreen mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-darkGreen mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-darkGreen mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-bold text-darkGreen mb-2">
              Additional Information
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
              placeholder="Tell us more about your farming needs..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
          >
            Submit Booking
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Booking;
