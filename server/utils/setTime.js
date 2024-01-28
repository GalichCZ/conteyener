const dayjs = require("dayjs");

function setTime(date) {
    return dayjs(date).set("hour", 12)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0);
}

module.exports = { setTime };
