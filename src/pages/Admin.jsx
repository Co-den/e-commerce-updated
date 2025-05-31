import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Admin = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.isAdmin) {
      axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: localStorage.getItem("token") },
      }).then(res => setUsers(res.data));

      axios.get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: localStorage.getItem("token") },
      }).then(res => setOrders(res.data));

      axios.get("http://localhost:5000/api/products")
        .then(res => setProducts(res.data));
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Users Section */}
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-semibold">Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.name} ({user.email})</li>
            ))}
          </ul>
        </div>

        {/* Orders Section */}
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-semibold">Orders</h3>
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                {order.userId.name} - ${order.totalAmount} - {order.status}
              </li>
            ))}
          </ul>
        </div>

        {/* Products Section */}
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-semibold">Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                {product.name} - ${product.price} 
                <button
                  className="text-red-500 ml-2"
                  onClick={() => axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
                    headers: { Authorization: localStorage.getItem("token") },
                  }).then(() => setProducts(products.filter(product => product._id !== product._id)))}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
