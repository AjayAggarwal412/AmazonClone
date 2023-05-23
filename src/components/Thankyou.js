import React from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";

function Thankyou({ orderDetails }) {
  return (
    <div className="order__confirm">
      <h1>
        Hello, {orderDetails?.customer?.firstname}
        {orderDetails?.customer?.lastname}
      </h1>
      <h2>Thank you for your order!</h2>
      <h3>Your order number is: {orderDetails?.id}</h3>
      <h4>Order Total: {orderDetails?.order.total.formatted_with_symbol}</h4>
      <Link to="/">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default Thankyou;
