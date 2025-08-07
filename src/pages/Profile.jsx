import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


<<<<<<< HEAD
const Product = () => {
  const [products, setProducts] = useState([]);

=======

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  // User data state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Order state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({
    orders: true,
    update: false,
  });
  const [error, setError] = useState(null);

  // Fetch orders when user/token changes
>>>>>>> 0172229ced7c368f8b74975afddfc62f5644cb70
  useEffect(() => {
    axios
      .get("https://project-1-b69v.onrender.com/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-white from-black via-green-950 to-black text-white font-mono p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-md border border-yellow-500/30 rounded-2xl shadow-xl p-6 hover:shadow-yellow-500/50 transition-all duration-300">
          <h2 className="text-2xl font-bold text-lemon mb-4">My Profile</h2>

          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm text-green">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  placeholder="Change Name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 bg-black/30 border border-yellow-500 text-black rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-green">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  placeholder="Change Email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 bg-black/30 border border-yellow-500 text-black rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading.update}
                className="bg-orange hover:bg-yellow rounded-md px-4 py-2 text-white"
              >
                {loading.update ? "Saving..." : "💾 Save Changes"}
                </button>
            </form>
          ) : (
            <>
              <p className="text-lg text-black mb-2">
                <span className="text-green">Name:</span> {user?.name}
              </p>
              <p className="text-lg text-black mb-4">
                <span className="text-green">Email:</span> {user?.email}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-orange hover:bg-yellow rounded-md text-black font-semibold"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Order History */}
        <div className="bg-white/10 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-xl p-6 hover:shadow-orange-500/40 transition-all duration-300">
          <h2 className="text-2xl font-bold text-lemon mb-4">
            Order History
          </h2>

          {loading.orders ? (
            <p className="text-green">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-black">No orders found. Time to go shopping!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-green border-b border-orange-500">
                    <th className="py-2 text-left">Order ID</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Items</th>
                    <th className="py-2 text-left">Total</th>
                    <th className="py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="text-black border-b border-orange-800 hover:bg-orange-900/20"
                    >
                      <td className="py-2">{order._id}</td>
                      <td className="py-2">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.quantity}x{" "}
                            {item.productId?.name || "Unknown Product"}
                          </div>
                        ))}
                      </td>
                      <td className="py-2">${order.totalAmount.toFixed(2)}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded ${
                            order.status === "Delivered"
                              ? "bg-green-500"
                              : order.status === "Shipped"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
>>>>>>> 0172229ced7c368f8b74975afddfc62f5644cb70
      </div>
    </div>
  );
};

export default Product;