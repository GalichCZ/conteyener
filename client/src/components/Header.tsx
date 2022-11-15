import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

export const Header = () => {
  const authCtx = useContext(AuthContext);
  return (
    <header className="header">
      <Link to="/">Conteyener</Link>
      {!authCtx.isLoggedIn ? (
        <Link to="/login">Log In</Link>
      ) : (
        <Link onClick={authCtx.logout} to="/login">
          Log Out
        </Link>
      )}
      <Link to="/table">Table</Link>
    </header>
  );
};
