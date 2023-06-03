import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { FC } from "react";

const URL = import.meta.env.VITE_API_URL;
type Anchor = "top" | "left" | "bottom" | "right";

interface Props {
  onClose: (anchor: Anchor, c: boolean) => void;
  anchor: Anchor;
}

export const UploadFile: FC<Props> = ({ onClose, anchor }) => {
  const props: UploadProps = {
    name: "file",
    action: URL + "/item/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
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

  console.log(props);

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Загрузить файл</Button>
    </Upload>
  );
};
