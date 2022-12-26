import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { Item } from "../../../functions/itemFuncs";
import { Comment } from "../../../Types/Types";
import ReDrawContext from "../../../store/redraw-context";

const ItemFuncs = new Item();

interface TabeCommentProps {
  opened: boolean | undefined;
  setOpen: (c: boolean) => void;
  _id: string;
  defaultValue: string;
  setId: (c: string) => void;
}

export const TableComment: React.FC<TabeCommentProps> = ({
  opened,
  setOpen,
  _id,
  defaultValue,
  setId,
}) => {
  const reDraw = useContext(ReDrawContext);
  const [data, setData] = useState<Comment>({ comment: "", _id });
  const [err, setErr] = useState<string | null>();

  const handleOk = async () => {
    const response = await ItemFuncs.updateComment(data);
    if (response.error) setErr(response.error);
    if (response === 200) {
      reDraw.reDrawHandler(true);
      setOpen(false);
      setId("");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setId("");
  };

  useEffect(() => {
    if (opened) setData({ ...data, _id: _id, comment: defaultValue });
  }, [opened]);

  return (
    <Modal
      title="Комментарий к заявке"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
      className="comment-modal"
    >
      <Form layout="vertical">
        <p>{defaultValue}</p>
        <Form.Item label="Комментарий">
          <Input.TextArea
            placeholder="Измените Комментарий"
            onChange={(e) => {
              setData({ ...data, comment: e.target.value });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
