import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Product from "./pages/Products";
import ProductPage from "./pages/productPage";
import CategoryProducts from "./pages/categoryProducts";
import Booking from "./pages/Booking";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/authSlice";
import Settings from "./pages/Setting";
import CustomerService from "./pages/CustomerService";
import Returns from "./pages/ReturnPage";
import FAQ from "./pages/FAQ";
import "./App.css";


const MainLayout = () => {
  const location = useLocation();
  //const dispatch = useDispatch();

  // Hide Navbar on Login and Register pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryProducts />}
          />
          <Route path="/booking" element={<Booking />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<CustomerService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/returns" element={<Returns />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
};

export default App;
