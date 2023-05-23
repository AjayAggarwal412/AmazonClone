import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./cart.css";
import "./subtotal.css";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./Firebase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 100,
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Cart({ cart, decrementQuantity, incrementQuantity, removeFromCart }) {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const checkoutHandler = () => {
    history.push("/checkout");
  };

  const loginModal = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />

        <div>
          <h3>Hello, {user ? user?.email : "Guest"}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>

          {cart?.line_items?.map((item) => {
            return (
              <div className="checkoutProduct" key={item.id}>
                <img className="checkoutProduct__image" src={item.image.url} />

                <div className="checkoutProduct__info">
                  <p className="checkoutProduct__title">{item.name}</p>
                  <p className="checkoutProduct__price">
                    <strong>
                      {item.price.formatted_with_symbol} * {item.quantity} =
                      {cart.currency.symbol}
                      {item.price.raw * item.quantity}
                    </strong>
                  </p>
                  <button
                    className="decrement"
                    onClick={() => decrementQuantity(item.id, item.quantity)}
                  >
                    -
                  </button>
                  <button
                    className="increment"
                    onClick={() => incrementQuantity(item.id, item.quantity)}
                  >
                    +
                  </button>
                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="checkout__right">
        <div className="subtotal">
          <p>
            Subtotal ({cart?.total_items} items) :
            <strong> {cart?.subtotal?.formatted_with_symbol}</strong>
          </p>
          <small className="subtotal__gift">
            <input type="checkbox" /> This order contains a gift
          </small>
          <button
            onClick={
              user && cart?.total_items != 0 ? checkoutHandler : loginModal
            }
          >
            Proceed to Checkout
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {!user ? "Oops! You are not logged in." : "Cart is Empty."}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="box">
                  {!user ? (
                    <Link to="/login">Please login first to checkout.</Link>
                  ) : (
                    "Add some items to the cart"
                  )}
                </div>
              </Typography>
              <button className="close" onClick={handleClose}>
                Close
              </button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Cart;
