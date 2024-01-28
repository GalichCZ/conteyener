const StockSchema = require('../models/stockPlace-model');
const {SendBotMessage} = require("../service/bot-service");
const dayjs = require("dayjs");

class StoreRepository {
    async getStockPlaceByName (name) {
        try {
            return await StockSchema.findOne({name}).exec();
        } catch (error) {
            await SendBotMessage(
                `${dayjs(new Date()).format(
                    "MMMM D, YYYY h:mm A"
                )}\nGETTING STORE ERROR:\n${error}`
            );
            return null
        }
    }
}

module.exports = new StoreRepository();