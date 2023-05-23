import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "./Firebase";
import "./header.css";

function Header({ cart, categoryList }) {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logoutHandler = async () => {
    await signOut(auth);
  };

  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          ></img>
        </Link>

        <div className="header__search">
          <input type="text" className="header__searchInput" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <div className="header__option">
            <span className="header__optionLineOne">
              <Link to={!user ? "/Login" : ""}>
                <div className="header__option">
                  <span className="header__optionLineOne">
                    {!user ? (
                      ""
                    ) : (
                      <h2>
                        Welcome,
                        <br />
                        {user.email}
                      </h2>
                    )}
                  </span>
                  <span className="header__optionLineTwo">
                    {user ? "" : <h1>Sign In</h1>}
                  </span>
                </div>
              </Link>
            </span>
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">
              <Link to={!user ? "/sign-up" : ""}>
                {user ? (
                  <button className="logout" onClick={logoutHandler}>
                    Log Out
                  </button>
                ) : (
                  <button className="signUp">Sign up</button>
                )}
              </Link>
            </span>
          </div>

          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <Link to="/orders">
              <span className="header__optionLineTwo">&amp; Orders</span>
            </Link>
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

          <Link to="/cart">
            <div className="header__optionBasket">
              <ShoppingCartIcon />
              <span className="header__optionLineTwo header__basketCount">
                {cart?.total_items}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="header__bottom">
        <ul>
          {categoryList?.map((category) => {
            return (
              <li key={category.id}>
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Header;
