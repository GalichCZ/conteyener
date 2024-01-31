const ProductService = require("../service/product-service");
const FileService = require("../service/file-service");

class ProductController {
  async createProduct(req, res) {
    const products = await FileService.createFileOld(req.file.path);
    const response = await ProductService.createProduct(
      products,
      req.params.item_id,
      req.params.simple_product_name
    );

    res.json(response);
  }

  async createProductHand(req, res) {
    try{
      const product = req.body.product
      const itemId = req.params.id
      const simpleName = req.params.simple_product_name

      if (!itemId) {
        res.status(400).json({message: "no item id"})
        return
      }
      if (!simpleName) {
        res.status(400).json({message: "no simple name"})
        return
      }
      if (!product) {
        res.status(400).json({message: "no product body"})
        return
      }

      await ProductService.createProductHand(product, itemId, simpleName)

      res.sendStatus(200)
    } catch (e) {
      console.log(e)
      res.status(500).json("Oops... Something goes wrong")
    }
  }

  async getProduct(req, res) {
    const response = await ProductService.getProduct(
      req.params.item_id,
      req.params.simple_product_name
    );

    res.json(response);
  }

  async getProducts(req, res) {
    const response = await ProductService.getProducts(req.body.products_id);

    if (response.success) res.json(response.products);
    else res.status(500).json(response);
  }

  async deleteProduct(req, res) {
    const response = await ProductService.deleteProduct(
      req.params._id,
      req.params.itemId
    );

    if (response.success) res.json(response);
    else res.status(500).json(response);
  }
}

module.exports = new ProductController();
