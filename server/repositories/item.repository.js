const ItemSchema = require('../models/item-model');
const {SendBotMessage} = require("../service/bot-service");
const dayjs = require("dayjs");

class ItemRepository {
    async getAllItems() {
        try {
            return await ItemSchema.find().exec();
        } catch (error) {
            await SendBotMessage(
                `${dayjs(new Date()).format(
                    "MMMM D, YYYY h:mm A"
                )}\nGETTING ITEM ERROR:\n${error}`
            );
            console.log(error);
            return null;
        }
    }

    async updateItemById(id,query) {
        try {
            await ItemSchema.findByIdAndUpdate(id, query).exec();
            return true;
        } catch (error) {
            await SendBotMessage(
                `${dayjs(new Date()).format(
                    "MMMM D, YYYY h:mm A"
                )}\nGETTING ITEM ERROR:\n${error}`
            );
            console.log(error);
            return error;
        }
    }

    async getSpecificItem(query){
        try {
            return await ItemSchema.find(query).exec();
        } catch (error) {
            await SendBotMessage(
                `${dayjs(new Date()).format(
                    "MMMM D, YYYY h:mm A"
                )}\nGETTING ITEM ERROR:\n${error}`
            );
            console.log(error);
            return null;
        }
    }

    async deleteAllItems() {
        try {
            await ItemSchema.deleteMany({}).exec();
            return true;
        } catch (error) {
            await SendBotMessage(
                `${dayjs(new Date()).format(
                    "MMMM D, YYYY h:mm A"
                )}\nGETTING STORE ERROR:\n${error}`
            );
            console.log(error);
            return false;
        }
    }
}

module.exports = new ItemRepository();