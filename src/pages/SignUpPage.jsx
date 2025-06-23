// src/pages/SignUpPage.jsx
import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
         background: "linear-gradient(135deg, #1f2937, #111827)",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <SignUp routing="path" path="/sign-up" redirectUrl="/" afterSignUpUrl="/" />
      </div>
    </div>
  );
};

export default SignUpPage;
