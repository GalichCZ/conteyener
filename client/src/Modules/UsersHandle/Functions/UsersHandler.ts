const URL = import.meta.env.VITE_API_URL;

export class UsersHandlerClass {
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

  async getMe(userId: string | null) {
    const response = await fetch(URL + `/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
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
