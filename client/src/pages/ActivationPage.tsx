import React, { useEffect, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useSearchParams, useNavigate } from "react-router-dom";
const URL = "http://localhost:4444/api";

export const ActivationPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [params, setParams] = useSearchParams();

  const activationHandler = async () => {
    await fetch(URL + `/activate/${params.get("activation")}`, {
      mode: "no-cors",
    })
      .then((res) => res.status)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    activationHandler();
    if (authCtx.isLoggedIn) navigate("/");
  }, []);

  return <section className="activation-page">ActivationPage</section>;
};
