const URL = import.meta.env.VITE_API_URL;

export class LoginClass {
  async login(loginValues: object) {
    const response = await fetch(URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify(loginValues),
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
