import { useUpdateDates } from "@/hooks/useUpdateDates";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { FC, useState } from "react";

const URL = import.meta.env.VITE_API_URL;
type Anchor = "top" | "left" | "bottom" | "right";

interface Props {
  onClose: (anchor: Anchor, c: boolean) => void;
  anchor: Anchor;
}

export const UploadFile: FC<Props> = ({ onClose, anchor }) => {
  const [itemsToUpdate, setItemsToUpdate] = useState<[]>([]);

  const { status, loading, error } = useUpdateDates(itemsToUpdate);

  const props: UploadProps = {
    name: "file",
    action: URL + "/item/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        console.log(info.file.response);
        setItemsToUpdate(info.file.response);
        message.success(`${info.file.name} file uploaded successfully`);
        onClose(anchor, false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Загрузить файл</Button>
    </Upload>
  );
};
