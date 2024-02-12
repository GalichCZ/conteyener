const Product = require('../models/product-model')

const updateArticleData = async () => {
  try {
    await Product.updateMany({}, [
      { $set: { article_ved: '$article' } },
      { $set: { article_erp: '' } },
    ])
    const products = await Product.find().exec()
    console.log(products)
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

module.exports = { updateArticleData }
