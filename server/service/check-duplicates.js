const ItemSchema = require("../models/item-model");

class CheckDuplicates {
  async checkDuplicates(array, key, id) {
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
    const items = unfilteredItems.filter((value) => value !== undefined);
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
