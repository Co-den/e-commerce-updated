import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";



const OrderConfirmation = () => {
  const { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (state?.paymentId) {
        try {
          const { data } = await axios.get(
            `https://project-1-b69v.onrender.com/api/orders/payment/${state.paymentId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // if using auth
              },
            }
          );
          setOrderDetails(data);
        } catch (err) {
          console.error("Error fetching order:", err);
        }
      }
    };

    fetchOrder();
  }, [state]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 rounded-2xl shadow-xl bg-white text-black font-mono">
      <h2 className="text-3xl font-bold mb-6">🎉 Order Confirmation</h2>

      {orderDetails ? (
        <div>
          <h3 className="text-xl font-semibold text-green mb-4">
            Payment ID: {orderDetails.paymentId}
          </h3>
          <h3 className="text-xl font-semibold text-green mb-4">
            Status: {orderDetails?.status || "Loading..."}
          </h3>
          <h3 className="text-xl font-semibold text-green mb-4">
            Total Amount: ${orderDetails.totalAmount}
          </h3>

          <h4 className="text-lg font-semibold text-yellow">Ordered Items</h4>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index} className="mb-2">
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-lg">Thank you for your purchase!</p>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}

      {/* Back to Home Button */}
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="py-2 px-6 bg-orange text-white rounded-xl font-bold hover:bg-yellow-500 transition duration-200 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
