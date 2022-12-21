const URL = "https://api-automycka.space/api";
// const URL = "http://localhost:4444/api";

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
    return response;
  }

  async getUsers(_id: string | null) {
    const response = await fetch(URL + `/users/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }

  async deleteUser(email: string) {
    const response = await fetch(URL + `/user/${email}`, {
      method: "DELETE",
    })
      .then((response) => response.status)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  }

  async changeRole(email: string, role: string) {
    const object = {
      email,
      role,
    };
    const response = await fetch(URL + "/role", {
      method: "PATCH",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.status)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  }
}
