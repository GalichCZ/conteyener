const ItemSchema = require("../models/item-model");
const ProductService = require("../service/product-service")
const addHasAddedProducts = async () => {
    const items = await ItemSchema.find().exec()

    for (const item of items) {
        const hasAddedProducts = {}
        const productNames = item.simple_product_name
        productNames.forEach(name => hasAddedProducts[name] = false)
        for (const product of productNames){
            const products = await ProductService.getProduct(item._id, product)
            if(products.length > 0) {
                hasAddedProducts[product] = true
            }
        }
        await ItemSchema.findByIdAndUpdate(item._id, {product_has_added: hasAddedProducts})
    }
}

module.exports = {addHasAddedProducts}