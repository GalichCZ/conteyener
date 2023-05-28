import React, { useRef } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

const URL = import.meta.env.VITE_API_URL;

export const UploadFile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files;
    // Handle the selected file as needed

    console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file[0]);

      try {
        const response = await fetch(URL + "/item/upload", {
          method: "POST",
          body: formData,
        });

        // Handle the response from the Express.js app
        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("An error occurred while uploading the file", error);
      }
    }
  };

  return (
    // <div>
    //   <input
    //     ref={fileInputRef}
    //     type="file"
    //     style={{ display: "none" }}
    //     onChange={handleFileUpload}
    //   />
    //   <Button onClick={handleButtonClick}>Загрузить файл</Button>
    // </div>
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Загрузить файл</Button>
    </Upload>
  );
};
