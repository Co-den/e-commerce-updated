import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51Qnr1YFY7JPTy18WDrWYkwbPWGMWEpiSb3NPTn3BmuJjl717C2WgQK8YhFDFgwkqIBUSAvOVQbG2ng1ysEnofRxl00rRBukZL1");

const Payment = () => {
   const total = useSelector((state) => state.cart.total);
  return (
    <Elements stripe={stripePromise}>
       <CheckoutForm cartTotal={total} />
    </Elements>
  );
};

export default Payment;