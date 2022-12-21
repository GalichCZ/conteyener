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
}

export const TableComment: React.FC<TabeCommentProps> = ({
  opened,
  setOpen,
  _id,
  defaultValue,
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
    }
  };

  useEffect(() => {
    if (opened) setData({ ...data, _id: _id });
  }, [opened]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Комментарий к заявке"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
      className="comment-modal"
    >
      <Form layout="vertical">
        <Form.Item label="Комментарий">
          <Input.TextArea
            defaultValue={defaultValue}
            placeholder="Комментарий"
            onChange={(e) => {
              setData({ ...data, comment: e.target.value });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
