const ItemSchema = require("../models/item-model");

/*
    3 cases:
    create item
    update item
    create poles in item update
    check array for duplicates{on frontend} than find the items except passed id 
*/

class CheckDuplicates {
  async checkDuplicates(array, key, id) {
    //inside, proform, order, declaration
    const results = await Promise.all(
      array.map(async (item) => {
        const query = {
          hidden: false,
          _id: { $ne: id },
        };
        query[key] = item;
        return await ItemSchema.find(query);
      })
    );
    const unfilteredItems = results.map((result) => {
      if (result[0] !== undefined) return result[0];
      else return;
    });
    console.log(id);
    const items = unfilteredItems.filter((value) => value !== undefined);
    console.log(items);
    if (items.length === 0) return { isDuplicate: false };
    else {
      const duplicates = items.map((item) => {
        return item[key][0];
      });
      return { isDuplicate: true, duplicates: duplicates.toString() };
    }
  }
}

module.exports = new CheckDuplicates();
