import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!state?.paymentId) return;

      try {
        const { data } = await axios.get(
          `https://project-1-b69v.onrender.com/api/orders/payment/${state.paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Optional if using auth
            },
          }
        );
        setOrderDetails(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [state]);

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-10 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-3xl font-bold text-darkGreen mb-2 flex items-center gap-2">
       Order Confirmation
      </h2>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase! Here are your order details:
      </p>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500">Loading order details...</p>
      ) : orderDetails ? (
        <>
          {/* Order Summary */}
          <div className="space-y-3 mb-6">
            <p className="text-lg">
              <span className="font-semibold text-gray-800">Payment ID:</span>{" "}
              {orderDetails.paymentId}
            </p>
            
            <p className="text-lg">
              <span className="font-semibold text-gray-800">Status:</span>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  orderDetails.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {orderDetails.status || "Pending"}
              </span>
            
            </p>
             <p className="text-lg">
              <span className="font-semibold text-gray-800">Shipping Address:</span>{" "}
              {orderDetails.shippingAddress}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-800">Total Amount:</span>{" "}
              ${orderDetails.totalAmount}
            </p>
          </div>

          {/* Ordered Items */}
          <h4 className="text-xl font-semibold text-darkGreen mb-4">
            Ordered Items
          </h4>
          <ul className="divide-y divide-gray-200 mb-8">
            {orderDetails.items.map((item, index) => (
              <li key={index} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  ${item.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            We appreciate your trust in us and look forward to serving you
            again!
          </p>
        </>
      ) : (
        <p className="text-red-500">Unable to fetch order details.</p>
      )}

      {/* Back to Home Button */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-darkGreen text-white rounded-xl font-semibold shadow-md hover:bg-green transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
