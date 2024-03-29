import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooksRedux";
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
      {authCtx.isLoggedIn ? (
        <>
          {authCtx.isActivated && authCtx.role !== "new_one" ? (
            <>
              <Link to="/table">Table</Link>
              <Link to="/table/hidden">Доставленные</Link>
              {authCtx.role === "manager_int" && <DropDown />}
              <Link
                style={{ transform: "translateX(20px)" }}
                onClick={authCtx.logout}
                to="/login"
              >
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link onClick={authCtx.logout} to="/login">
                Log Out
              </Link>
            </>
          )}
        </>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </header>
  );
};
