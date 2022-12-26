const XLSX = require("xlsx");

class FileService {
  async createFile(file) {
    const workbook = XLSX.readFile(file, { cellDates: true });
    const json = workbook.SheetNames.map((sheet) => {
      return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    });

    return json;
  }
}

module.exports = new FileService();
