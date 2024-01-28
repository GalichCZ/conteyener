const DeliveryChannelSchema = require("../models/deliveryChannel-model");
const ItemSchema = require("../models/item-model");
const FormulaService = require("./formula-service");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");

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
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELIVERY CHANNEL CREATE ERROR:\n${error}`
      );
      return error;
    }
  }

  async getChannels() {
    try {
      const deliveryChannels = await DeliveryChannelSchema.find().exec();

      return deliveryChannels;
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELIVERY CHANNEL GET ALL ERROR:\n${error}`
      );
      return error;
    }
  }

  async updateDeliveryChannel(req) {
    try {
      await DeliveryChannelSchema.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          name: req.body.name,
          eta: req.body.eta,
          date_do: req.body.date_do,
          declaration_issue_date: req.body.declaration_issue_date,
          train_depart_date: req.body.train_depart_date,
          train_arrive_date: req.body.train_arrive_date,
          store_arrive_date: req.body.store_arrive_date,
        }
      );

      const itemsToUpdate = await ItemSchema.find({
        etd: { $ne: null },
        delivery_channel: req.body._id,
      });

      const updateDates = itemsToUpdate.map(async (item) => {
        const formulaRes = await FormulaService.updatedDateFormula(
          item.etd,
          item.delivery_channel,
          item
        );
        await ItemSchema.findByIdAndUpdate(
          {
            _id: item._id,
          },
          {
            eta: !item.eta_update ? formulaRes.eta : item.eta,
            date_do: !item.date_do_update ? formulaRes.date_do : item.date_do,
            declaration_issue_date: !item.declaration_issue_date_update
              ? formulaRes.declaration_issue_date
              : item.declaration_issue_date,
            train_depart_date: !item.train_depart_date_update
              ? formulaRes.train_depart_date
              : item.train_depart_date,
            train_arrive_date: !item.train_arrive_date_update
              ? formulaRes.train_arrive_date
              : item.train_arrive_date,
            store_arrive_date: !item.store_arrive_date_update
              ? formulaRes.store_arrive_date
              : item.store_arrive_date,
          }
        );
      });

      Promise.all(updateDates).then((res) => {
        return res;
      });

      return { success: true };
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELIVERY CHANNEL UPDATE ERROR:\n${error}`
      );
      return { success: false, error };
    }
  }
}

module.exports = new DeliveryChannelService();
