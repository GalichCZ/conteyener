import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

export const ActivatePage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx.isActivated === true) navigate("/");
  }, []);

  return (
    <section className="activation-page">
      <h3>Thank you for your registration</h3>
      <p>Please check your email for activation link</p>
    </section>
  );
};
