const dayjs = require("dayjs");
const {clearString} = require("./clearString");

class TableDataHandle {
  checkBoolean(value) {
    if (value === "+") return true;
    return false;
  }

  checkDate(value) {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "number") return null;
    if (value.includes(".")) return new Date(dayjs(value, "DD.MM.YYYY"));
  }

  splitStrings(value) {
    if (value !== undefined && typeof value === "string"){
      const arr = value.split("\n");
      return arr.map((item) => clearString(item))
    }
    else return [];
  }

  castToNum(value) {
    if (value && typeof value === "string") {
      const number = parseInt(value.replace(/[^\d.-]/g, ""));
      return number;
    } else return value;
  }
}

module.exports = new TableDataHandle();
