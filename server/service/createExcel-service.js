const XLSX = require("xlsx");
const dayjs = require("dayjs");
const ItemSchema = require("../models/item-model");

class FileService {
  async arrayToString(array) {
    return array.join("\n");
  }

  async createFile(file) {
    try {
      const items = await ItemSchema.find().exec();
      const jsonDataFetch = items.map(async (item) => {
        return {
          "Дата заявки": item.request_date,
          "Номер заказа": await this.arrayToString(item.order_number),
          "Номер Контейнера": item.container_number,
          Товар: await this.arrayToString(item.simple_product_name),
          "Способ Доставки": item.delivery_method,
          Поставщик: await this.arrayToString(item.providers),
          Импортер: await this.arrayToString(item.importers),
          "Условия поставки": await this.arrayToString(item.conditions),
          Склад: item.store_name,
          Агент: item.agent,
          "Тип контейенра": item.container_type,
          "Место отправки": item.place_of_dispatch,
          Линия: item.line,
          "Дата готовности": item.ready_date,
          "Дата загрузки": item.load_date,
          ETD: item.etd,
          ETA: item.eta,
          Релиз: item.release,
          "BL/СМГС/CMR": item.bl_smgs_cmr ? "+" : "-",
          ТД: item.td ? "+" : "-",
          "Дата ДО": item.date_do,
          Порт: item.port,
          "Д/С для подачи": item.is_ds ? "+" : "-",
          "Номер декларации": await this.arrayToString(item.declaration_number),
          "Дата выпуска декларации": item.declaration_issue_date,
          "Наличие ОБ": item.availability_of_ob,
          "Ответ ОБ": item.answer_of_ob,
          Экспедитор: item.expeditor,
          "Станци прибытия": item.destination_station,
          "Осталось км до ст. назначения": item.km_to_dist,
          "Дата отправки по ЖД": item.train_depart_date,
          "Дата прибытия по ЖД": item.train_arrive_date,
          Автовывоз: item.pickup,
          "Дата прибытия на склад": item.store_arrive_date,
          "Сток Сдачи	": item.stock_place_name,
        };
      });

      Promise.all(jsonDataFetch).then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");

        XLSX.writeFile(
          workBook,
          `./backupExcels/${dayjs(new Date())
            .format("MMMM D, YYYY")
            .replace(" ", "_")
            .replace(",", "_")
            .replace(" ", "")}.xlsx`
        );
      });

      return {
        success: true,
        fileName: `${dayjs(new Date())
          .format("MMMM D, YYYY")
          .replace(" ", "_")
          .replace(",", "_")
          .replace(" ", "")}.xlsx`,
      };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE EXCEL FILE ERROR:\n${error}`
      );
      return { success: false, error };
    }
  }

  async downloadFile(fileName) {
    try {
      const filePath = `./backupExcels/${fileName}`;
      return { success: true, filePath };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDOWNLOAD EXCEL FILE ERROR:\n${error}`
      );
      return { success: false, error };
    }
  }
}

module.exports = new FileService();
