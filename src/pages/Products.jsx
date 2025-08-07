import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-1-b69v.onrender.com/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-green mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-green p-4 rounded-lg shadow-lg hover:bg-yellow transition-all"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-orange"
            />
            <h3 className="text-orange text-xl font-semibold">{product.name}</h3>
            <p className="text-black text-lg mt-2">${product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="text-green hover:text-orange mt-4 inline-block"
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
