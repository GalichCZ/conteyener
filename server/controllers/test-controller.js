const DeclarationService = require('../service/declaration-service')
const ProductService = require('../service/product-service')
const FileService = require('../service/file-service')
const FormulaService = require('../service/formula-service')
const ItemRepository = require('../repositories/item.repository')
const ExcelService = require('../service/createExcel-service')
const { checkDate } = require('../utils/tableDataHandle')
const { clearString } = require('../utils/clearString')
const { updateArticleData } = require('../migrations/product-migration')

class TestController {
  async testDeclaration(req, res) {
    const response = await DeclarationService.createDeclarationStatus(req)

    res.json(response)
  }

  async getTestDeclaration(req, res) {
    const response = await DeclarationService.getDeclarationStatus(req.params.declaration_number)

    if (response) res.json(response)
    else res.status(404).json({ message: 'no declarations found' })
  }

  async testProduct(req, res) {
    const products = await FileService.createFile(req.file.path)
    const response = await ProductService.createProduct(products)

    res.json(response)
  }

  async testUpdateProduct(req, res) {
    await ProductService.deleteProduct('637ce24055d01524f399e853')

    const products = await FileService.createFile(req.file.path)
    const response = await ProductService.createProduct(products)

    res.json(response)
  }

  async testFormula(req, res) {
    const response = await FormulaService.dateFormula(req.body.delivery_method, req.body.etd)
    res.json(response)
  }

  async writeAllDocs(req, res) {
    const items = await ItemRepository.getSpecificItem({
      $expr: {
        $and: [
          { $gt: [{ $size: '$order_number' }, 0] }, // order_number array length > 0
          { $eq: [{ $size: '$is_docs' }, 0] }, // is_docs array length === 0
        ],
      },
    })
  }

  async datesTimeChange(req, res) {
    const items = await ItemRepository.getAllItems()

    //need to use function checkDate for all date poles in item and save them
    const promises = items.map(async (item) => {
      const result = await ItemRepository.updateItemById(item._id, {
        request_date: checkDate(item.request_date),
        ready_date: checkDate(item.ready_date),
        load_date: checkDate(item.load_date),
        etd: checkDate(item.etd),
        eta: checkDate(item.eta),
        release: checkDate(item.release),
        date_do: checkDate(item.date_do),
        declaration_issue_date: checkDate(item.declaration_issue_date),
        availability_of_ob: checkDate(item.availability_of_ob),
        answer_of_ob: checkDate(item.answer_of_ob),
        train_depart_date: checkDate(item.train_depart_date),
        train_arrive_date: checkDate(item.train_arrive_date),
        store_arrive_date: checkDate(item.store_arrive_date),
      })
      if (result !== true) res.json({ message: `error ${result}` })
    })

    await Promise.all(promises)

    res.json({ message: 'success' })
  }

  async clearStrings(req, res) {
    const result = await ItemRepository.cleaAllStringsInItems()

    res.json(result)
  }

  async getAllItems(req, res) {
    const items = await ItemRepository.getAllItems()
    res.json(items)
  }

  async makeExcelForProducts(req, res) {
    try {
      const items = await ItemRepository.getAllItems()
      const objectToExcel = []

      for (const item of items) {
        for (const str of item.simple_product_name) {
          const product = await ProductService.getProduct(item._id.toString(), str)
          console.log(product)
          product.forEach((pr) => {
            objectToExcel.push({
              'Номер контейнера': item.container_number,
              'Товар': str,
              'Код ТН ВЭД': pr?.hs_code,
              'Aртикул ВЭД': pr?.article_ved,
              'Торговая марка': pr?.trade_mark,
              'Наименование': pr?.product_name,
              'Модель/Серия(Тип)': pr?.model,
              'Модификация': pr?.modification,
              'Кол-во штук': pr?.quantity_pieces,
              'Кол-во мест': pr?.quantity_places,
              'Цена за еденицу': pr?.piece_price,
              'Общая сумма': pr?.total_price,
              'Вес нетто': pr?.weight_net,
              'Вес брутто': pr?.weight_gross,
              'Объем': pr?.cbm,
              'Производитель': pr?.manufacturer,
            })
          })
        }
      }
      await ExcelService.createExcel(objectToExcel, 'products.xlsx')
      await res.status(200).json({ message: 'success', objectToExcel })
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  }

  async migrateProducts(req, res) {
    try {
      await updateArticleData()
      res.status(200).json({ message: 'success' })
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  }

  //ep that will use clearString function on all string fields and all strings that are in array or object
}

module.exports = new TestController()
