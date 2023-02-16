const URL = import.meta.env.VITE_API_URL;

export class Declaration {
  async getDeclarationStatus(declaration_number: string | undefined) {
    declaration_number;
    const response = await fetch(URL + "/declaration/get", {
      method: "POST",
      body: JSON.stringify({ declaration_number }),
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

  async createDeclarationStatus(declarationData: object) {
    declarationData;
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
