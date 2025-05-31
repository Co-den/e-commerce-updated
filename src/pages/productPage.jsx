import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { motion } from "framer-motion";




const ProductPage = () => {
  const { id } = useParams();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://project-1-b69v.onrender.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      setIsAddingToCart(true);
      try {
        const normalizedProduct = { ...product, _id: product.id };
        dispatch(addToCart({ product: normalizedProduct, quantity }));

        setShowAlert(true);
      } catch (error) {
        console.error("Failed to add to cart:", error);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-white py-12 px-4">
      {product && (
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Product Image */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl border-4 border-yellow-500 shadow-xl"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-orange drop-shadow-lg">
              {product.name}
            </h2>
            <p className="text-green mt-4">{product.description}</p>
            <p className="text-lg text-gray-900 mt-2">${product.price}</p>

            <div className="mt-6">
              <label htmlFor="quantity" className="mr-2 text-green">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="border-2 border-yellow-500 text-black px-3 py-2 rounded-lg w-16"
              />
            </div>

            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  message={`${quantity} ${product.name} added to cart!`}
                  type="success"
                  onClose={() => setShowAlert(false)}
                />
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleAddToCart}
              className="mt-6 bg-orange text-white py-3 px-6 rounded-lg text-lg hover:bg-yellow hover:text-white transition-all duration-300 shadow-lg"
            >
              {isAddingToCart ? (
                <>
                  <Loader size="sm" variant="light" className="h-4 w-4" />
                  <span> Adding to Cart...</span>
                </>
              ) : (
                "Add to Cart"
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductPage;
