const URL = "http://localhost:4444";

export class User {
  async signUp(signUpValues: object) {
    const response = await fetch(URL + "/auth/signin", {
      method: "POST",
      body: JSON.stringify(signUpValues),
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

  async getMe(token: string) {}
}
