const {SendBotMessage} = require("../service/bot-service");
const dayjs = require("dayjs");
const DeliveryChannelSchema = require('../models/deliveryChannel-model');

class DeliveryChannelRepository {
    async getDeliveryChannelByName(name) {
        try {
            return await DeliveryChannelSchema.findOne({name}).exec();
        }catch (error) {
            await SendBotMessage(
                `${dayjs(new Date()).format(
                    "MMMM D, YYYY h:mm A"
                )}\nGETTING STORE ERROR:\n${error}`
            );
            return null
        }
    }
}

module.exports = new DeliveryChannelRepository();