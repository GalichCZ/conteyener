import { IComment, IUpdateComment } from "../../../Types/Types";

const URL = import.meta.env.VITE_API_URL;

export const createComment = async (comment: IComment) => {
  console.log(comment);
  const response = await fetch(URL + "/comment", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response;
};

export const getComment = async (comment_item: string) => {
  const response = await fetch(URL + `/comment/${comment_item}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const updateComment = async (updateComment: IUpdateComment) => {
  console.log(updateComment);
  const response = await fetch(URL + "/comment", {
    method: "PATCH",
    body: JSON.stringify(updateComment),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
  return response;
};
