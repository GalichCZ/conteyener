const XLSX = require("xlsx");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
class FileService {
  async createFile(file) {
    try {
      const workbook = XLSX.readFile(file, { cellDates: true });
      const json = workbook.SheetNames.map((sheet) => {
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      });

      return json;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE FILE ERROR:\n${error}`
      );
    }
  }
}

module.exports = new FileService();
