const XLSX = require('xlsx')
const dayjs = require('dayjs')
const ItemSchema = require('../models/item-model')
const { formatDate } = require('../utils/formatDate')
const { SendBotMessage } = require('./bot-service')

class FileService {
  async arrayToString(array) {
    return array.join('\n')
  }

  async createExcel(data, filename) {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, filename)
  }

  async createFile(file) {
    try {
      const items = await ItemSchema.find({ hidden: false })
        .populate('delivery_channel', 'name')
        .populate('store', 'name')
        .populate('stock_place', 'name')
        .exec()
      const jsonDataFetch = items.map(async (item) => {
        return {
          'Дата заявки': formatDate(item.request_date),
          'Внутренний номер': await this.arrayToString(item.inside_number),
          'Номер проформы': await this.arrayToString(item.proform_number),
          'Номер заказа': await this.arrayToString(item.order_number),
          'Номер контейнера': item.container_number,
          'Товар': await this.arrayToString(item.simple_product_name),
          'Способ Доставки': item.delivery_method,
          'Поставщик': await this.arrayToString(item.providers),
          'Импортер': await this.arrayToString(item.importers),
          'Условия поставки': await this.arrayToString(item.conditions),
          'Направление': item.direction,
          'Склад': item.store ? item.store.name : '',
          'Агент': item.agent,
          'Тип контейенра': item.container_type,
          'Место отправки': item.place_of_dispatch,
          'Линия': item.line,
          'Дата готовности\t': formatDate(item.ready_date),
          'Дата загрузки': formatDate(item.load_date),
          'ETD': formatDate(item.etd),
          'ETA': formatDate(item.eta),
          'Релиз': formatDate(item.release),
          'BL/СМГС/CMR': item.bl_smgs_cmr ? '+' : '-',
          'ТД': item.td ? '+' : '-',
          'Дата ДО': formatDate(item.date_do),
          'Порт': item.port,
          'Д/С для подачи': item.is_ds ? '+' : '-',
          'Фрахтовый счет': item.fraht_account,
          'Документы для подачи': '',
          'Номер декларации': await this.arrayToString(item.declaration_number),
          'Дата выпуска декларации': formatDate(item.declaration_issue_date),
          'Наличие ОБ': formatDate(item.availability_of_ob),
          'Ответ ОБ': formatDate(item.answer_of_ob),
          'Экспедитор': item.expeditor,
          'Станци прибытия': item.destination_station,
          'Осталось км до ст. назначения': item.km_to_dist,
          'Дата отправки по ЖД': formatDate(item.train_depart_date),
          'Дата прибытия по ЖД': formatDate(item.train_arrive_date),
          'Автовывоз': item.pickup,
          'Дата прибытия на склад': formatDate(item.store_arrive_date),
          'Сток Сдачи	': item.stock_place ? item.stock_place.name : '',
          'Комментарий': item.comment?.length,
        }
      })

      Promise.all(jsonDataFetch).then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1')

        XLSX.writeFile(
          workBook,
          `./backupExcels/${dayjs(new Date())
            .format('MMMM D, YYYY')
            .replace(' ', '_')
            .replace(',', '_')
            .replace(' ', '')}.xlsx`
        )
      })

      return {
        success: true,
        fileName: `${dayjs(new Date())
          .format('MMMM D, YYYY')
          .replace(' ', '_')
          .replace(',', '_')
          .replace(' ', '')}.xlsx`,
      }
    } catch (error) {
      await SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nCREATE EXCEL FILE ERROR:\n${error}`
      )
      return { success: false, error }
    }
  }

  async downloadFile(fileName) {
    try {
      const filePath = `./backupExcels/${fileName}`
      return { success: true, filePath }
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nDOWNLOAD EXCEL FILE ERROR:\n${error}`
      )
      return { success: false, error }
    }
  }

  async downloadProductsFile() {
    try {
      const filePath = `./products.xlsx`
      return { success: true, filePath }
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nDOWNLOAD EXCEL FILE ERROR:\n${error}`
      )
      return { success: false, error }
    }
  }
}

module.exports = new FileService()
