import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("activated") === "false")
      navigate("/activate");
  }, []);
  return (
    <section className="main-page">
      <h1>CONTEYENER</h1>
    </section>
  );
};
