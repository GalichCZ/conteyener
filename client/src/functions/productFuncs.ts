const URL = "https://api-automycka.space/api";

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
