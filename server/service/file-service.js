const XLSX = require("xlsx");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
class FileService {

  //TODO: add old method for global update
  async createFile(file) {
    try {
      const {workbook, worksheet} = this.handleFile(file);
      const cols = workbook.Sheets[workbook.SheetNames[0]];
      const colNames = Object.keys(cols)
        .filter((name) => name[name.length - 1] === "1")
        .map((name) => cols[name].v);

      const json = worksheet[0].map((i) => {
        const row = {};
        colNames.forEach((name) => (row[name] = i[name] ? i[name] : null));
        return row;
      });

      return { json, colNames };
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE FILE ERROR:\n${error}`
      );
    }
  }

  async createFileOld(file) {
    try {
      const {worksheet} = this.handleFile(file);

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

  handleFile(file) {
    const workbook = XLSX.readFile(file, { cellDates: true });
    const worksheet = workbook.SheetNames.map((sheet) => {
      if (workbook.Sheets[sheet]["!merges"]) {
        workbook.Sheets[sheet]["!merges"].map((merge) => {
          const value = XLSX.utils.encode_range(merge).split(":")[0];
          for (let col = merge.s.c; col <= merge.e.c; col++)
            for (let row = merge.s.r; row <= merge.e.r; row++)
              workbook.Sheets[sheet][
              String.fromCharCode(65 + col) + (row + 1)
                  ] = workbook.Sheets[sheet][value];
        });
      }
      return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    });

    return {worksheet, workbook};
  }
}

module.exports = new FileService();
