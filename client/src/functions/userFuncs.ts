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

  async getMe(userId: string | null) {
    const response = await fetch(URL + `/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    console.log(response);
    return response;
  }
}
