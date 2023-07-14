const URL = import.meta.env.VITE_API_URL;
import { Products } from "@/Types/Types";
export class Product {
  async getProducts(products_id: string[]): Promise<Products[]> {
    const response = await fetch(URL + "/product", {
      method: "POST",
      body: JSON.stringify({ products_id }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  }
}

export const deleteProduct = async (_id: string, itemId: string) => {
  const response = await fetch(URL + `/product/${_id}/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return response;
};
