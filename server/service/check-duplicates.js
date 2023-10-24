const ItemSchema = require("../models/item-model");

class CheckDuplicates {
  async checkDuplicatesArray(array, key, id) {
    const results = await Promise.all(
      array.map(async (item) => {
        const query = {
          hidden: false,
          _id: { $ne: id },
        };
        query[key] = item;
        console.log(query);
        return await ItemSchema.find(query);
      })
    );
    const unfilteredItems = results.map((result) => {
      if (result[0] !== undefined) return result[0];
      else return;
    });
    const items = unfilteredItems.filter((value) => {
      value !== undefined &&
        value["inside_number"] !== "-" &&
        value["proform_number"] !== "-";
    });
    if (items.length === 0) return { isDuplicate: false };
    else {
      const duplicates = items.map((item) => {
        return item[key][0];
      });
      return { isDuplicate: true, duplicates: duplicates.toString() };
    }
  }

  async checkDuplicates(value, key, id) {
    const query = {
      hidden: false,
      _id: { $ne: id },
    };
    if (!value) return { isDuplicate: false };
    query[key] = value;
    const item = await ItemSchema.find(query).exec();

    if (item.length > 0) return { isDuplicate: true, duplicate: item[0][key] };
    else return { isDuplicate: false };
  }
}

module.exports = new CheckDuplicates();
