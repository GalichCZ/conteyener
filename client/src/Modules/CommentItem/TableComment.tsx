import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { Item } from "../Table/Functions/itemFuncs";
import { IUpdateComment, IComment } from "../../Types/Types";
import ReDrawContext from "../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setOpenComment,
  setCommentId,
} from "../../store/slices/tableCommentSlice";
import { getComment } from "./CommentApi";

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

  const [comments, setComments] = useState<IComment[]>();
  const [data, setData] = useState<IUpdateComment>({
    comment_text: "",
    _id: "",
  });
  const [err, setErr] = useState<string | null>();

  const handleOk = async () => {
    // const response = await ItemFuncs.updateComment(data);
    // if (response.error) setErr(response.error);
    // if (response === 200) {
    reDraw.reDrawHandler(true);
    dispatch(setOpenComment());
    dispatch(setCommentId(""));
    // }
  };

  const handleCancel = () => {
    dispatch(setOpenComment());
    dispatch(setCommentId(""));
  };

  const getComments = async () => {
    const result = await getComment(_id);
    if (result) setComments(result);
  };

  useEffect(() => {
    getComments();
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
      <Form layout="vertical" className="comment-section">
        {comments?.map((comment) => {
          return <Comment setData={setData} value={comment} />;
        })}
      </Form>
    </Modal>
  );
};

interface ICommentProps {
  setData: (c: IUpdateComment) => void;
  value: IComment;
}

export const Comment: React.FC<ICommentProps> = ({ setData, value }) => {
  return (
    <Form.Item>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px" }}>
          <b>Дата:</b>
          <p>{value.comment_date}</p>
        </div>
        <Input.TextArea
          value={value.comment_text}
          placeholder="Измените Комментарий"
          onChange={(e) => {
            setData({ _id: value._id, comment_text: e.target.value });
          }}
        />
      </div>
    </Form.Item>
  );
};
