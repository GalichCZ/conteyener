const URL = import.meta.env.VITE_API_URL;

export class Product {
  async getProducts(_id: string, simple_product_name: string) {
    const response = await fetch(URL + `/product/${_id}/${simple_product_name}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return response;
  }
}
