const URL = "http://localhost:4444/api";

export class Declaration {
  async getDeclarationStatus(declaration_number: string | undefined) {
    const response = await fetch(URL + `/declaration/${declaration_number}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async createDeclarationStatus(declarationData: object) {
    console.log(declarationData);
    const response = await fetch(URL + "/declaration", {
      method: "POST",
      body: JSON.stringify(declarationData),
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
      });
    return response;
  }
}
