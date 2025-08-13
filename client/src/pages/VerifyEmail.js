import React from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  return (
    <div className="container">
      <h2>Verify Email</h2>
      <p>Token: {token}</p>
    </div>
  );
};

export default VerifyEmail;
