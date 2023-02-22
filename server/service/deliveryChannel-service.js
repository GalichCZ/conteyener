const DeliveryChannelSchema = require("../models/deliveryChannel-model");

class DeliveryChannelService {
  async createDeliveryChannel(req) {
    try {
      const deliveryChannel = await DeliveryChannelSchema.findOne({
        name: req.body.name,
      });
      if (deliveryChannel) return { message: "Deliver channel already exists" };

      const doc = new DeliveryChannelSchema({
        name: req.body.name,
        eta: req.body.eta,
        date_do: req.body.date_do,
        declaration_issue_date: req.body.declaration_issue_date,
        train_depart_date: req.body.train_depart_date,
        train_arrive_date: req.body.train_arrive_date,
        store_arrive_date: req.body.store_arrive_date,
      });

      const newChannel = await doc.save();
      return newChannel;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getChannels() {
    try {
      const deliveryChannels = await DeliveryChannelSchema.find().exec();

      return deliveryChannels;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new DeliveryChannelService();
