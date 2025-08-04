/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Alert from "../components/Alert";
import axios from "axios";


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const hoverScale = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      const normalizedProduct = { ...product, _id: product.id };
      dispatch(addToCart({ product: normalizedProduct, quantity }));
      //dispatch(addToCart({ product, quantity: 1 })); // Default quantity to 1
      setSelectedProduct(product);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "https://project-1-b69v.onrender.com/api/products/featured"
        );
        console.log("API Response:", response);
        setFeaturedProducts(response.data.products); // Match your response structure
      } catch (error) {
        console.error("API Error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      }
    };

    fetchFeaturedProducts();
  }, []);
  // Poultry-related categories
  const categories = [
    { name: "Chickens", slug: "chickens" },
    { name: "Eggs", slug: "eggs" },
    { name: "Feed", slug: "feed" },
    { name: "Equipment", slug: "equipment" },
  ];

  return (
    <div className="bg-yellow-50 min-h-screen">
      {/* Alert */}
      {showAlert && selectedProduct && (
        <Alert
          message={`1 ${selectedProduct.name} added to cart!`}
          type="success"
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-16 pb-32 bg-green from-green-400 to-green-500 overflow-hidden"
      >
    
        {/* Centered Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60vh] flex items-center justify-center text-center relative z-10">
          <div className="w-full md:w-2/3 relative z-20">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              🐔 Welcome to Agrify Your Trusted Source for Poultry!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-base font-bold text-white sm:text-lg md:mt-5 md:text-xl"
            >
              Looking for healthy live chickens, adorable day-old chicks, or
              farm-fresh eggs? You've found the perfect place. We supply
              high-quality poultry to farmers, homes, and agribusinesses with
              care, speed, and reliability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-5 flex justify-center md:mt-8"
            >
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-600 transition-colors"
              >
                Start Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Featured Categories */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-yellow mb-8"
        >
          Shop by Category
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <motion.div
              key={category.slug}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/category/${category.slug}`}
                className="bg-orange rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow block"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-white">
                    Explore our {category.name.toLowerCase()} collection
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Products */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-yellow-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-yellow mb-8"
          >
            Featured Products
          </motion.h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts &&
              featuredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <motion.div variants={hoverScale}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-orange text-xl font-semibold">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-orange-600 font-bold">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAddingToCart}
                        className="mt-4 w-full bg-orange text-white py-2 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
                      >
                        {isAddingToCart ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-orange-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl font-bold text-yellow mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Join Our Poultry Newsletter
          </motion.h2>

          <motion.p
            className="text-orange-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get exclusive deals and farming tips
          </motion.p>

          <motion.div
            className="max-w-md mx-auto flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <motion.button
              className="bg-orange text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-800 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg text-green font-bold mb-4">🐔Agrify</h3>
              <p className="text-orange-200">Your trusted poultry partner</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-orange-300">
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-orange-300">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 text-orange-300">
                <a href="#" className="hover:text-white">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-8 pt-8 border-t border-orange-800 text-center text-orange-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p>&copy; 2024 Agrify. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
