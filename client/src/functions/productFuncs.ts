const URL = "http://localhost:4444/api";

export class Product {
  async getProducts(container: string) {
    const response = await fetch(URL + `/product/${container}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return response;
  }
}
