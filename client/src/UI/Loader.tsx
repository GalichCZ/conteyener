import React from "react";
import { Alert, Space, Spin } from "antd";

export const Loader: React.FC = () => (
  <section className="activation-page">
    <Space direction="vertical" style={{ width: "100%" }}>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>
  </section>
);
