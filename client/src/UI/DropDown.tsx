import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/tech/users">Пользователи</Link>,
  },
  {
    key: "2",
    label: <Link to="/tech/store">Склады</Link>,
  },
  {
    key: "3",
    label: <Link to="/tech/deliverychannel">Каналы поставки</Link>,
  },
];

export const DropDown = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown menu={{ items }} placement="bottomRight">
          {/* <Button>bottomRight</Button> */}
          <SettingOutlined className="settings-btn" />
        </Dropdown>
      </Space>
    </Space>
  );
};
