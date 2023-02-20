const DeliveryChannelService = require("../service/deliveryChannel-service");

class DeliveryChannelController {
  async createDeliveryChannel(req, res) {
    try {
      const deliveryChannel =
        await DeliveryChannelService.createDeliveryChannel(req);

      return res.status(200).json(deliveryChannel);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Eternal server error" });
    }
  }

  async getChannels(req, res) {
    try {
      res.status(200).json(await DeliveryChannelService.getChannels());
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Eternal server error" });
    }
  }
}

module.exports = new DeliveryChannelController();
