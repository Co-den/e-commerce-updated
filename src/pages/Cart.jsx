import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-black">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 text-yellow">🛒</div>
          <p className="text-xl text-green mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-block bg-orange text-white px-6 py-3 rounded-lg hover:bg-yellow transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="bg-white text-black rounded-lg shadow-sm p-4 mb-4 transition-all hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-contain rounded-lg border border-green"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold hover:text-yellow">
                      <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                    </h3>
                    <p className="text-green">${item.product.price.toFixed(2)}</p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border border-green rounded-lg">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.product._id))}
                          className="px-3 py-1 hover:bg-green-600"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.product._id))}
                          className="px-3 py-1 hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.product._id))}
                        className="text-red-500 hover:text-red-700 flex items-center"
                      >
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-black">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white text-black p-6 rounded-lg shadow-sm h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-lemon">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-green">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                </span>
                <span className="text-green">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span className="text-green">Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between font-bold border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="inline-block w-full bg-orange text-white py-3 rounded-lg mt-6 hover:bg-yellow transition-colors"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-4 text-sm text-gray-600 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure checkout
            </div>

            <Link
              to="/products"
              className="inline-block w-full text-center text-green mt-4 hover:text-yellow transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
