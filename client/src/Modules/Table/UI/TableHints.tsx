import { Alert } from "antd";

export const TableHints = () => {
  return (
    <Alert
      style={{
        position: "absolute",
        top: "10px",
        right: "5px",
        boxShadow: "1px 1px 10px gray",
        fontWeight: "bold",
      }}
      message={"Подсказка"}
      description={`Для скролла влево/вправо используйте комбинацию "shift+scroll"`}
      type="info"
      banner
      closable
    />
  );
};
