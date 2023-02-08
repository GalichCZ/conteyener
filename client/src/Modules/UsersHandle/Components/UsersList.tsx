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
    console.log(response);
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
  }, []);

  return (
    <div className="users-list">
      <UsersListUI
        data={data}
        loading={loading}
        admin={authCtx.role === "admin"}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
      {/* <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              title={
                <p>
                  {item.first_name} {item.last_name}
                </p>
              }
              description={item.email}
            />
            <Select
              value={item.role}
              style={{ width: 120 }}
              onChange={(e) => handleChange(e, item.email)}
              loading={loading}
              options={[
                {
                  value: "moderator",
                  label: "Модератор",
                },
                {
                  value: "admin",
                  label: "Админ",
                },
                {
                  value: "user",
                  label: "Пользователь",
                },
              ]}
            />
            {authCtx.role === "admin" && (
              <CloseOutlined
                onClick={() => handleDelete(item.email)}
                style={{ marginLeft: "10px", scale: "1.25" }}
              />
            )}
          </List.Item>
        )}
      /> */}
    </div>
  );
};
