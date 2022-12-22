const URL = "https://api-automycka.space/api";
// const URL = "http://localhost:4444/api";

export class Product {
  async getProducts(_id: string) {
    const response = await fetch(URL + `/product/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return response;
  }
}
