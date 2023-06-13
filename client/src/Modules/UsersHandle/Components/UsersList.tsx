import React, { useEffect, useState } from "react";
import { UsersHandlerClass } from "../Functions/UsersHandler";
import { UserData } from "../../../Types/Types";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import UsersListUI from "../UI/UsersListUI";

const UsersHandler = new UsersHandlerClass();

export const UsersList = () => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserData[]>([]);

  const loadMoreData = async () => {
    const _id = window.localStorage.getItem("_id");
    const response = await UsersHandler.getUsers(_id);
    setData(response);
  };

  const handleChange = async (value: string, email: string) => {
    setLoading(true);
    const response = await UsersHandler.changeRole(email, value);
    if (response === 200) setLoading(false);
  };

  const handleDelete = async (email: string) => {
    const response = await UsersHandler.deleteUser(email);
    if (response === 200) loadMoreData();
  };

  useEffect(() => {
    loadMoreData();
  }, [loading]);

  return (
    <div className="users-list">
      <UsersListUI
        data={data}
        loading={loading}
        admin={authCtx.role === "manager_int"}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
    </div>
  );
};
