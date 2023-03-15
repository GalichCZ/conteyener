import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { Item } from "../Table/Functions/itemFuncs";
import { IUpdateComment, IComment } from "../../Types/Types";
import ReDrawContext from "../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setOpenComment,
  setCommentId,
} from "../../store/slices/tableCommentSlice";
import { createComment, getComment, updateComment } from "./CommentApi";
import dayjs from "dayjs";

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

  const [newComment, setNewComment] = useState<IComment>({
    comment_date: "",
    comment_item: "",
    comment_text: "",
  });
  const [comments, setComments] = useState<IComment[]>();
  const [upComment, setUpComment] = useState<IUpdateComment>({
    comment_text: "",
    _id: "",
  });
  const [err, setErr] = useState<string | null>();

  const handleOk = async () => {
    dispatch(setOpenComment());
    dispatch(setCommentId(""));
  };

  const handleCancel = () => {
    dispatch(setOpenComment());
    dispatch(setCommentId(""));
  };

  const getComments = async () => {
    const result = await getComment(_id);
    if (result) setComments(result);
  };

  const createCommentHandler = async () => {
    reDraw.reDrawHandler(true);
    const result = await createComment(newComment);
    if (result) reDraw.reDrawHandler(false);
  };

  useEffect(() => {
    if (open) {
      getComments();
      setNewComment({
        ...newComment,
        comment_item: _id,
        comment_date: dayjs(new Date()).toISOString(),
      });
    }
  }, [open, reDraw.reDraw]);

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
        {comments?.map((comment, key) => {
          return <Comment key={key} value={comment} />;
        })}
      </Form>
      <Form layout="vertical">
        <Form.Item label="Добавить комментарий">
          <Input.TextArea
            value={newComment?.comment_text}
            onChange={(e) => {
              setNewComment({ ...newComment, comment_text: e.target.value });
            }}
          />
        </Form.Item>
        <Button onClick={createCommentHandler}>Отправить</Button>
      </Form>
    </Modal>
  );
};

interface ICommentProps {
  value: IComment;
}
export const Comment: React.FC<ICommentProps> = ({ value }) => {
  const [upComment, setUpComment] = useState<IUpdateComment>({
    comment_text: value.comment_text,
    _id: value._id,
  });

  const updateCommentHandler = async () => {
    const result = await updateComment(upComment);
  };

  return (
    <Form.Item
      label={`${value.creator_name?.first_name} ${value.creator_name?.last_name}`}
    >
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px" }}>
          <b>Дата:</b>
          <p>{dayjs(value.comment_date).format("DD/MM/YYYY")}</p>
        </div>
        <Input.TextArea
          style={{ margin: "0 10px" }}
          value={upComment.comment_text}
          placeholder="Измените Комментарий"
          onChange={(e) => {
            setUpComment({ _id: value._id, comment_text: e.target.value });
          }}
        />
        <Button onClick={updateCommentHandler}>Редактировать</Button>
      </div>
    </Form.Item>
  );
};
