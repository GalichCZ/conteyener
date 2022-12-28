import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { Item } from "../../../functions/itemFuncs";
import { Comment } from "../../../Types/Types";
import ReDrawContext from "../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  setOpenComment,
  setCommentId,
} from "../../../store/slices/tableCommentSlice";

const ItemFuncs = new Item();

interface TabeCommentProps {
  opened?: boolean | undefined;
  setOpen?: (c: boolean) => void;
  _id?: string;
  value?: string;
  setId?: (c: string) => void;
}

export const TableComment: React.FC<TabeCommentProps> = ({}) => {
  const reDraw = useContext(ReDrawContext);
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableComment.open);
  const _id = useAppSelector((state) => state.tableComment._id);
  const value = useAppSelector((state) => state.tableComment.value);

  const [data, setData] = useState<Comment>({ comment: "", _id });
  const [err, setErr] = useState<string | null>();

  const handleOk = async () => {
    const response = await ItemFuncs.updateComment(data);
    if (response.error) setErr(response.error);
    if (response === 200) {
      reDraw.reDrawHandler(true);
      dispatch(setOpenComment());
      dispatch(setCommentId(""));
    }
  };

  const handleCancel = () => {
    dispatch(setOpenComment());
    dispatch(setCommentId(""));
  };

  useEffect(() => {
    if (open) setData({ ...data, _id: _id, comment: value });
  }, [open]);

  return (
    <Modal
      title="Комментарий к заявке"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      className="comment-modal"
      destroyOnClose
    >
      <Form layout="vertical">
        <p>{value}</p>
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
