import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/authSlice";
import axios from "axios";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // States
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState({
    orders: true,
    update: false,
    addresses: false,
    returns: false,
  });
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    if (!user?.id || !token) return;
    const fetchData = async () => {
      try {
        // Orders
        const ordersRes = await axios.get(
          `https://project-1-b69v.onrender.com/api/orders/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(ordersRes.data.orders || []);

        // Addresses
        const addressRes = await axios.get(
          `https://project-1-b69v.onrender.com/api/users/${user.id}/addresses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses(addressRes.data.addresses || []);

        // Returns
        const returnsRes = await axios.get(
          `https://project-1-b69v.onrender.com/api/returns/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReturns(returnsRes.data.returns || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load data");
      } finally {
        setLoading((prev) => ({ ...prev, orders: false }));
      }
    };
    fetchData();
  }, [user?.id, token]);

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, update: true }));
    try {
      const result = await dispatch(
        updateUser({ id: user.id, userData: formData })
      ).unwrap();
      setFormData({ name: result.name, email: result.email, password: "" });
      setIsEditing(false);
    } catch (err) {
      setError(err || "Update failed");
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  // Add address
  const handleAddAddress = async () => {
    if (!newAddress.trim()) return;
    setLoading((prev) => ({ ...prev, addresses: true }));
    try {
      const res = await axios.post(
        `https://project-1-b69v.onrender.com/api/users/${user.id}/addresses`,
        { address: newAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(res.data.addresses);
      setNewAddress("");
    } catch {
      setError("Failed to save address");
    } finally {
      setLoading((prev) => ({ ...prev, addresses: false }));
    }
  };

  // Request return
  const handleRequestReturn = async (orderId) => {
    setLoading((prev) => ({ ...prev, returns: true }));
    try {
      await axios.post(
        `https://project-1-b69v.onrender.com/api/returns`,
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Return request submitted successfully");
    } catch {
      setError("Failed to request return");
    } finally {
      setLoading((prev) => ({ ...prev, returns: false }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter p-4 sm:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

        {/* Profile Management */}
        <div className="bg-white border rounded-2xl shadow-xl p-4 sm:p-6">
          <h2 className="text-2xl text-green font-bold mb-4">My Profile</h2>
          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={formData.name}
                placeholder="Change Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="email"
                value={formData.email}
                placeholder="Change Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="password"
                value={formData.password}
                placeholder="New Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                disabled={loading.update}
                className="bg-green px-4 py-2 rounded text-white"
              >
                {loading.update ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-green text-white rounded"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Saved Addresses */}
        <div className="bg-white border rounded-2xl shadow-xl p-4 sm:p-6">
          <h2 className="text-2xl text-green font-bold mb-4">Saved Addresses</h2>
          <ul className="mb-4 space-y-2">
            {addresses.map((addr, idx) => (
              <li key={idx} className="border-b pb-2">{addr}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Add new address"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAddAddress}
              disabled={loading.addresses}
              className="bg-yellow-600 px-4 py-2 rounded text-white"
            >
              {loading.addresses ? "Saving..." : "Add"}
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white border rounded-2xl shadow-xl p-4 sm:p-6 col-span-1 sm:col-span-2 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Order ID</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Total</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.status === "Delivered" && (
                          <button
                            onClick={() => handleRequestReturn(order._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                          >
                            Request Return
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Returns & Refunds */}
        <div className="bg-white border rounded-2xl shadow-xl p-4 sm:p-6 col-span-1 sm:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Returns & Refunds</h2>
          {returns.length === 0 ? (
            <p>No return requests</p>
          ) : (
            <ul className="space-y-2">
              {returns.map((ret, idx) => (
                <li key={idx} className="border-b pb-2">
                  Order: {ret.orderId} — Status: {ret.status}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
