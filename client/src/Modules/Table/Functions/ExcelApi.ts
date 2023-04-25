const URL = import.meta.env.VITE_API_URL;

export const createExcelFile = async () => {
  const response = await fetch(URL + "/file/create")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const downloadFile = async (fileName: string) => {
  const response = await fetch(URL + `/file/download/${fileName}`);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
};
