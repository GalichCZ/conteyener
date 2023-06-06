const XLSX = require("xlsx");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
class FileService {
  async createFile(file) {
    try {
      const workbook = XLSX.readFile(file, { cellDates: true });
      const worksheet = workbook.SheetNames.map((sheet) => {
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      });
      // const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      return worksheet;
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE FILE ERROR:\n${error}`
      );
    }
  }
}

module.exports = new FileService();
