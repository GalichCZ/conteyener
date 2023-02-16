import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import SearchIcon from "../Modules/Search/UI/SearchIcon";
import AuthContext from "../store/auth-context";
import { DropDown } from "./DropDown";
import { SearchHandler } from "../Modules/Search/Functions/SearchHandler";
import Search from "../Modules/Search/Components/Search";

export const Header = () => {
  const authCtx = useContext(AuthContext);
  return (
    <header className="header">
      <Link to="/">Conteyener</Link>
      {!authCtx.isLoggedIn ? (
        <Link to="/login">Log In</Link>
      ) : (
        <>
          {!authCtx.isActivated ? (
            <>
              <Link onClick={authCtx.logout} to="/login">
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/table">Table</Link>
              <Link to="/table/hidden">Доставленные</Link>
              <Link onClick={authCtx.logout} to="/login">
                Log Out
              </Link>
              {authCtx.role === "moderator" ||
                (authCtx.role === "admin" && <DropDown />)}
              <Search />
            </>
          )}
        </>
      )}
    </header>
  );
};
