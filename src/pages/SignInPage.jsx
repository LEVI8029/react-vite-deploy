// src/pages/SignInPage.jsx
import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
background: "linear-gradient(135deg, #121212, #000000)",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <SignIn routing="path" path="/sign-in" redirectUrl="/" afterSignInUrl="/" />
      </div>
    </div>
  );
};

export default SignInPage;
