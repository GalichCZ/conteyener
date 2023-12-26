const DeclarationService = require("../service/declaration-service");
const ProductService = require("../service/product-service");
const FileService = require("../service/file-service");
const FormulaService = require("../service/formula-service");
const ItemRepository = require("../repositories/item.repository");
const {
  checkDate,
} = require("../utils/tableDataHandle");

class TestController {
  async testDeclaration(req, res) {
    const response = await DeclarationService.createDeclarationStatus(req);

    res.json(response);
  }

  async getTestDeclaration(req, res) {
    const response = await DeclarationService.getDeclarationStatus(
      req.params.declaration_number
    );

    if (response) res.json(response);
    else res.status(404).json({ message: "no declarations found" });
  }

  async testProduct(req, res) {
    const products = await FileService.createFile(req.file.path);
    const response = await ProductService.createProduct(products);

    res.json(response);
  }

  async testUpdateProduct(req, res) {
    await ProductService.deleteProduct("637ce24055d01524f399e853");

    const products = await FileService.createFile(req.file.path);
    const response = await ProductService.createProduct(products);

    res.json(response);
  }

  async testFormula(req, res) {
    const response = await FormulaService.dateFormula(
      req.body.delivery_method,
      req.body.etd
    );
    res.json(response);
  }

  async writeAllDocs(req, res) {
    const items = await ItemRepository.getSpecificItem({ $expr: {
        $and: [
          { $gt: [{ $size: "$order_number" }, 0] },  // order_number array length > 0
          { $eq: [{ $size: "$is_docs" }, 0] }        // is_docs array length === 0
        ]
      }});
  }

  async datesTimeChange(req, res) {
    const items = await ItemRepository.getAllItems();

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
      });
      if (result !== true) res.json({ message: `error ${result}` });
    })

    await Promise.all(promises);

    res.json({ message: "success" });
  }

  async clearStrings(req, res) {
    const item = await ItemRepository.getAllItems();

    function clearString(str) {
      if(!str || typeof str !== "string") return;
      const cleanFromR = str.replace(/[\r]+/g, '');
      const clearFromEmpty = cleanFromR === "" ? cleanFromR.replace("", "-") : cleanFromR
      // const test = clearFromEmpty.length > 1 && clearFromEmpty[0] === "-" ? clearFromEmpty.replace("-", "") : clearFromEmpty;
      return clearFromEmpty.trim();
    }

    const promises = item.map(async (item) => {
      const result = await ItemRepository.updateItemById(item._id, {
        proform_number: item?.proform_number.map((str) => clearString(str)),
        order_number: item?.order_number.map((str) => clearString(str)),
        is_docs: item?.is_docs.map((doc) => ({...doc, order_number: clearString(doc.order_number)})),
        inside_number: item?.inside_number.map((str) => clearString(str)),
        container_number: clearString(item?.container_number),
        container_type: clearString(item?.container_type),
        simple_product_name: item?.simple_product_name.map((str) => clearString(str)),
        providers: item?.providers.map((str) => clearString(str)),
        importers: item?.importers.map((str) => clearString(str)),
        conditions: clearString(item?.conditions),
        direction: clearString(item?.direction),
        agent: clearString(item?.agent),
        place_of_dispatch: clearString(item?.place_of_dispatch),
        delivery_method: clearString(item?.delivery_method),
        declaration_number: item?.declaration_number.map((str) => clearString(str)),
      })
      if (result !== true) res.json({ message: `error ${result}` });
    })

    await Promise.all(promises);

    res.json({ message: "success" });
  }

  async getAllItems(req, res) {
    const items = await ItemRepository.getAllItems();
    res.json(items);
  }
}

module.exports = new TestController();
