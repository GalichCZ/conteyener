import { IsDocsType } from "../Types/Types";
const URL = "http://localhost:4444";

class Docs {
  async updateDocs(docs: object, _id: string) {
    const response = await fetch(URL + `/isdocs/${_id}`, {
      method: "POST",
      body: JSON.stringify(docs),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.status)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return error;
      });
    return response;
  }
}

export default Docs;
