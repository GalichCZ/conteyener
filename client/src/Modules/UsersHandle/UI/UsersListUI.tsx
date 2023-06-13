import React from "react";
import { UserData } from "../../../Types/Types";
import { List, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface IUsersListUI {
  data: UserData[];
  loading: boolean;
  admin: boolean;
  handleChange: (value: string, email: string) => void;
  handleDelete: (email: string) => void;
}

const UsersListUI: React.FC<IUsersListUI> = ({
  data,
  loading,
  admin,
  handleChange,
  handleDelete,
}) => {
  return (
    <>
      <List
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
              style={{ width: 200 }}
              onChange={(e) => handleChange(e, item.email)}
              loading={loading}
              options={[
                {
                  value: "manager_patriot",
                  label: "Патриот менеджер",
                },
                {
                  value: "manager_buyer",
                  label: "Менеджер закупок",
                },
                {
                  value: "head",
                  label: "Руководитель",
                },
                {
                  value: "manager_int",
                  label: "Международный менеджер",
                },
                {
                  value: "manager_sales",
                  label: "Менеджер продаж",
                },
                {
                  value: "manager_treasury",
                  label: "Менеджер казначейства",
                },
                {
                  value: "manager_store",
                  label: "Менеджер склада",
                },
              ]}
            />
            {admin && (
              <CloseOutlined
                onClick={() => handleDelete(item.email)}
                style={{ marginLeft: "10px", scale: "1.25" }}
              />
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default UsersListUI;
