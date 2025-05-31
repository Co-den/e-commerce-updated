import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import the useDispatch hook
import { clearCart } from "../redux/cartSlice"; // Import the clearCart action

const CheckoutForm = ({ cartTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch function
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);

  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      postal_code: "",
      country: "US",
    },
  });

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#ffffff",
        "::placeholder": {
          color: "#bbb",
        },
      },
      invalid: {
        color: "#ff4d4f",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe is not initialized");
      setIsProcessing(false);
      return;
    }

    try {
      const {
        data: { clientSecret },
      } = await axios.post(
        "https://project-1-b69v.onrender.com/api/payment/create-payment-intent",
        {
          amount: cartTotal * 100,
          currency: "usd",
          metadata: billingDetails,
        }
      );

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: billingDetails,
          },
          receipt_email: billingDetails.email,
        });

      if (stripeError) throw stripeError;

      if (paymentIntent.status === "succeeded") {
        // Send order data to backend
        await axios.post(
          "https://project-1-b69v.onrender.com/api/orders/after-payment",
          {
            // CheckoutForm Frontend payload
            cartItems: cartItems.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
              price: Number(item.product.price),
            })),
            totalAmount: cartTotal,
            billingDetails: {
              // Send billingDetails object (expected by backend)
              address: {
                line1: billingDetails.address.line1,
                city: billingDetails.address.city,
                postal_code: billingDetails.address.postal_code,
              },
            },
            paymentIntentId: paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Dispatch the action to clear the cart
        dispatch(clearCart());

        // Navigate to the order confirmation page
        navigate("/order-confirmation", {
          state: { paymentId: paymentIntent.id },
        });
      }
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setBillingDetails((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setBillingDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 p-8 rounded-2xl shadow-xl bg-white from-black via-green-900 to-black text-white font-mono"
    >
      <h2 className="text-3xl font-bold mb-6 text-black">🧾 Checkout</h2>

      {/* Billing Info */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-green">Billing Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={billingDetails.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/30 text-black border border-green-500 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={billingDetails.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/30 text-black border border-green-500 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
        </div>

        <input
          type="text"
          name="address.line1"
          placeholder="Street Address"
          value={billingDetails.address.line1}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 bg-black/30 text-blacks border border-green-500 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="address.city"
            placeholder="City"
            value={billingDetails.address.city}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/30 text-black border border-green-500 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
          <input
            type="text"
            name="address.postal_code"
            placeholder="Postal Code"
            value={billingDetails.address.postal_code}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/30 text-black border border-green-500 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
        </div>
      </div>

      {/* Payment Info */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-green">Payment Info</h3>
        <div className="mb-4">
          <label className="block text-sm text-yellow mb-2">Card Number</label>
          <div className="p-3 bg-black/20 border border-green-600 rounded-lg">
            <CardNumberElement options={cardElementOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-yellow mb-2">
              Expiry Date
            </label>
            <div className="p-3 bg-black/20 border border-green-600 rounded-lg">
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-yellow mb-2">CVC</label>
            <div className="p-3 bg-black/20 border border-green-600 rounded-lg">
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-4 px-8 bg-orange hover:bg-yellow rounded-xl font-bold text-black transition duration-200 ease-in-out ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing ? "Processing..." : `Pay $${cartTotal}`}
        </button>

        {error && (
          <p className="mt-4 text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
