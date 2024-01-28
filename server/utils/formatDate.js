const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

function formatDate(date) {
  if (!date) return "";

  const moscowDate = dayjs(date).tz("Europe/Moscow");

  const formattedDate = moscowDate.format("DD/MM/YYYY");

  return formattedDate;
}

module.exports = { formatDate };
