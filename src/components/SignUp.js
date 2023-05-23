import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import auth from "./Firebase";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const history = useHistory();

  const emailInput = (e) => {
    setEmail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  const nameInput = (e) => {
    setName(e.target.value);
  };

  const mobileInput = (e) => {
    setMobile(e.target.value);
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        // Successfully created a user with email and password
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className="sign-up">
        <Link to="/">
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          ></img>
        </Link>

        <div className="login__container">
          <h1>Sign Up</h1>

          <form>
            <h5>Name</h5>
            <input type="text" value={name} onChange={nameInput}></input>
            <h5>Mobile Number</h5>
            <input type="tel" value={mobile} onChange={mobileInput}></input>
            <h5>E-mail</h5>
            <input type="email" value={email} onChange={emailInput}></input>
            <h5>Password </h5>
            <input
              type="password"
              value={password}
              onChange={passwordInput}
            ></input>
            <p className="password">Passwords must be at least 6 characters.</p>

            <button className="login__signUpButton" onClick={register}>
              Sign Up
            </button>
          </form>

          <p className="account">
            Already have an account?&nbsp;<Link to="/login">SignIn</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
