const ItemSchema = require('../models/item-model')
const { SendBotMessage } = require('../service/bot-service')
const dayjs = require('dayjs')
const { clearString } = require('../utils/clearString')

class ItemRepository {
  async getAllItems() {
    try {
      return await ItemSchema.find().exec()
    } catch (error) {
      await SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nGETTING ITEM ERROR:\n${error}`
      )
      console.log(error)
      return null
    }
  }

  async updateItemById(id, query) {
    try {
      await ItemSchema.findByIdAndUpdate(id, query).exec()
      return true
    } catch (error) {
      await SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nGETTING ITEM ERROR:\n${error}`
      )
      console.log(error)
      return error
    }
  }

  async getSpecificItem(query) {
    try {
      return await ItemSchema.find(query).exec()
    } catch (error) {
      await SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nGETTING ITEM ERROR:\n${error}`
      )
      console.log(error)
      return null
    }
  }

  async deleteAllItems() {
    try {
      await ItemSchema.deleteMany({}).exec()
      return true
    } catch (error) {
      await SendBotMessage(
        `${dayjs(new Date()).format('MMMM D, YYYY h:mm A')}\nGETTING STORE ERROR:\n${error}`
      )
      console.log(error)
      return false
    }
  }

  async cleaAllStringsInItems() {
    const items = await this.getAllItems()

    const promises = items.map(async (item) => {
      const result = await this.updateItemById(item._id, {
        proform_number: item?.proform_number.map((str) => clearString(str)),
        order_number: item?.order_number.map((str) => clearString(str)),
        is_docs: item?.is_docs.map((doc) => ({
          ...doc,
          order_number: clearString(doc.order_number),
        })),
        inside_number: item?.inside_number.map((str) => clearString(str)),
        container_number: clearString(item?.container_number),
        container_type: clearString(item?.container_type),
        simple_product_name: item?.simple_product_name.map((str) => clearString(str)),
        providers: item?.providers.map((str) => clearString(str)),
        importers: item?.importers.map((str) => clearString(str)),
        conditions: item?.conditions.map((str) => clearString(str)),
        direction: clearString(item?.direction),
        agent: clearString(item?.agent),
        place_of_dispatch: clearString(item?.place_of_dispatch),
        delivery_method: clearString(item?.delivery_method),
        declaration_number: item?.declaration_number.map((str) => clearString(str)),
      })
      if (result !== true) return { message: `error ${result}` }
    })

    await Promise.all(promises)

    return { message: 'success' }
  }
}

module.exports = new ItemRepository()
