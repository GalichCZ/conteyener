const dayjs = require("dayjs");
const { setTime } = require("./setTime");

function addDayToDate(toUpdate, toAdd) {
    return setTime(dayjs(toUpdate).add(toAdd, "day"))
}

module.exports = { addDayToDate };
