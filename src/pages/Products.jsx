import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Product = () => {
  // State to store fetched products
  const [products, setProducts] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // Get search parameters from the URL
  const [searchParams] = useSearchParams();
  // Extract the 'search' query parameter, default to empty string
  const query = searchParams.get("search") || "";

  // Fetch all products from the API when the component mounts
  useEffect(() => {
    // Set loading to true before fetching
    setIsLoading(true); 
    axios
      .get("https://project-1-b69v.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data.products); // Store fetched products
        setIsLoading(false);            // Set loading to false
      })
      .catch((err) => {
        console.log(err);               // Log any errors
        setIsLoading(false);            // Set loading to false on error
      });
  }, []);

  // Array for rendering loading skeletons
  const skeletonArray = new Array(6).fill(0); // 6 skeleton placeholders

  return (
    // Main container styling
    <div className="container mx-auto p-4 bg-white min-h-screen">
      {/* Page title */}
      <h2 className="text-3xl font-bold text-darkGreen mb-6">Products</h2>
      {/* Show search query if present */}
      {query && <p>Showing results for "{query}"</p>}

      {/* Grid for products or skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          // Show skeletons while loading
          ? skeletonArray.map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 p-4 rounded-lg shadow-md animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 rounded mb-4" />
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
                <div className="h-3 bg-gray-300 rounded w-1/3" />
              </div>
            ))
          // Show products after loading
          : products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-darkGreen p-4 rounded-lg shadow-lg hover:bg-yellow transition-all"
              >
                {/* Product image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-orange"
                />
                {/* Product name */}
                <h3 className="text-xl font-semibold">
                  {product.name}
                </h3>
                {/* Product price */}
                <p className="text-black text-lg mt-2">${product.price}</p>
                {/* Link to product details */}
                <Link
                  to={`/product/${product.id}`}
                  className="text-red-700 hover:text-orange mt-4 inline-block"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default Product;
