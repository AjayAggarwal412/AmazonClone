import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import auth from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { provider } from "./Firebase";
import GoogleButton from "react-google-button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const emailInput = (e) => {
    setEmail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // const name = result.user.displayName;
  //       // const email = result.user.email;

  //       // localStorage.setItem("name", name);
  //       // localStorage.setItem("email", email);
  //       history.push("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <div className="login">
        <Link to="/">
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          ></img>
        </Link>

        <div className="login__container">
          <h1>Sign In</h1>

          <form>
            <h5>E-mail</h5>
            <input type="email" value={email} onChange={emailInput}></input>

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={passwordInput}
            ></input>

            <button
              className="login__signInButton"
              onClick={signIn}
              type="submit"
            >
              Sign In
            </button>
          </form>

          <p>
            By continuing, you agree to Amazon's Clone Conditions of Use and
            Privacy Notice.
          </p>

          <Link to="/sign-up">
            <button className="login__registerButton">
              Create your amazon account
            </button>
          </Link>
        </div>

        {/* <div className="google">
          <GoogleButton onClick={signInWithGoogle}>
            Sign In With Google
          </GoogleButton>
        </div> */}
      </div>
    </>
  );
}

export default Login;
