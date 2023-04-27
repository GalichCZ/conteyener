const { Router } = require("express");
const router = new Router();
const DeliveryChannelController = require("../controllers/deliveryChannel-controller");

router.get("/api/channel", DeliveryChannelController.getChannels);
router.patch("/api/channel", DeliveryChannelController.updateChannel);
router.post("/api/channel", DeliveryChannelController.createDeliveryChannel);

module.exports = router;
