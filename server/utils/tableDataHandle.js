const dayjs = require("dayjs");
const {clearString} = require("./clearString");

class TableDataHandle {
  checkBoolean(value) {
    return value === "+";
  }

  checkDate(value) {
    if (value === "-" || value === "+") return null;
    if (!value) return null;
    if (value instanceof Date) return new Date(value.setHours(12, 0, 0, 0));
    if (typeof value === "number") return null;
    if (typeof value !== "object" && value.includes(".")) return new Date (new Date(dayjs(value, "DD.MM.YYYY")).setHours(12, 0, 0, 0));
    return new Date(new Date(value).setHours(12, 0, 0, 0));
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
      return parseInt(value.replace(/[^\d.-]/g, ""));
    } else return value;
  }
}

module.exports = new TableDataHandle();
