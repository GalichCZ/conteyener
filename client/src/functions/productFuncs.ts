const URL = import.meta.env.VITE_API_URL;

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
