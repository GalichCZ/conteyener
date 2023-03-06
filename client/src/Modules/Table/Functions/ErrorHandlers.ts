export function callError(messageApi: any, content: string) {
  messageApi.open({
    type: "error",
    content,
  });
}
