import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import { FC, useState } from "react";

const URL = import.meta.env.VITE_API_URL;
type Anchor = "top" | "left" | "bottom" | "right";

interface Props {
  onClose: (anchor: Anchor, c: boolean) => void;
  anchor: Anchor;
}

const GlobalUpload: FC<Props> = ({ onClose, anchor }) => {
  const [loading, setLoading] = useState(false);
  const props: UploadProps = {
    name: "file",
    action: URL + "/item/global",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status == "uploading") {
        setLoading(true);
      }
      if (info.file.status !== "uploading") {
        setLoading(false);
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        onClose(anchor, false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "rgba(255, 255, 255, 0.466)",
          }}
        >
          Loading...
        </div>
      )}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Глобальная Загрузка</Button>
      </Upload>
    </>
  );
};

export default GlobalUpload;
