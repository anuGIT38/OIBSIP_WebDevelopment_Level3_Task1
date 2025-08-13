import React from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  return (
    <div className="container">
      <h2>Reset Password</h2>
      <p>Token: {token}</p>
    </div>
  );
};

export default ResetPassword;
