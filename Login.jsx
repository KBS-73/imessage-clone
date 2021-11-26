import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../../Firebase/firebase";
import "./Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://icons.iconarchive.com/icons/dakirby309/simply-styled/256/iMessage-icon.png"
          alt=""
        />
        <h1>iMessage</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
