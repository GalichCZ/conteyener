const dayjs = require("dayjs");
const DeliveryChannelSchema = require("../models/deliveryChannel-model");

class FormulaService {
  async dateFormula(_etd, _delivery_channel) {
    if (_delivery_channel && _etd) {
      const delivery_channel = await DeliveryChannelSchema.findById(
        _delivery_channel
      ).exec();

      const eta = dayjs(_etd).add(delivery_channel.eta, "day");

      const date_do = dayjs(eta).add(delivery_channel.date_do, "day");

      const declaration_issue_date = dayjs(date_do).add(
        delivery_channel.declaration_issue_date,
        "day"
      );

      const train_depart_date = dayjs(declaration_issue_date).add(
        delivery_channel.train_depart_date,
        "day"
      );

      const train_arrive_date = dayjs(train_depart_date).add(
        delivery_channel.train_arrive_date,
        "day"
      );

      const store_arrive_date = dayjs(train_arrive_date).add(
        delivery_channel.store_arrive_date,
        "day"
      );

      return {
        eta,
        date_do,
        declaration_issue_date,
        train_arrive_date,
        train_depart_date,
        store_arrive_date,
      };
    } else {
      return {
        eta: null,
        date_do: null,
        declaration_issue_date: null,
        train_depart_date: null,
        train_arrive_date: null,
        store_arrive_date: null,
      };
    }
  }

  async updateFormulaDates(req, item) {
    const dateType = req.body.dateType;
    const delivery_channel = await DeliveryChannelSchema.findById(
      item.delivery_channel
    ).exec();
    if (dateType === 1) {
      const eta = req.body.eta;
      const date_do = dayjs(eta).add(delivery_channel.date_do, "day");
      const declaration_issue_date = dayjs(date_do).add(
        delivery_channel.declaration_issue_date,
        "day"
      );
      const train_depart_date = dayjs(declaration_issue_date).add(
        delivery_channel.train_depart_date,
        "day"
      );
      const train_arrive_date = dayjs(train_depart_date).add(
        delivery_channel.train_arrive_date,
        "day"
      );
      const store_arrive_date = dayjs(train_arrive_date).add(
        delivery_channel.store_arrive_date,
        "day"
      );
      return {
        eta,
        date_do,
        declaration_issue_date,
        train_arrive_date,
        train_depart_date,
        store_arrive_date,
        eta_update: true,
        date_do_update: false,
        declaration_issue_date_update: false,
        train_depart_date_update: false,
        train_arrive_date_update: false,
        store_arrive_date_update: false,
      };
    } else if (dateType === 2) {
      const date_do = req.body.date_do;
      const declaration_issue_date = dayjs(date_do).add(
        delivery_channel.declaration_issue_date,
        "day"
      );
      const train_depart_date = dayjs(declaration_issue_date).add(
        delivery_channel.train_depart_date,
        "day"
      );
      const train_arrive_date = dayjs(train_depart_date).add(
        delivery_channel.train_arrive_date,
        "day"
      );
      const store_arrive_date = dayjs(train_arrive_date).add(
        delivery_channel.store_arrive_date,
        "day"
      );
      return {
        eta: item.eta,
        date_do,
        declaration_issue_date,
        train_arrive_date,
        train_depart_date,
        store_arrive_date,
        eta_update: item.eta_update,
        date_do_update: true,
        declaration_issue_date_update: false,
        train_depart_date_update: false,
        train_arrive_date_update: false,
        store_arrive_date_update: false,
      };
    } else if (dateType === 3) {
      const declaration_issue_date = req.body.declaration_issue_date;
      const train_depart_date = dayjs(declaration_issue_date).add(
        delivery_channel.train_depart_date,
        "day"
      );
      const train_arrive_date = dayjs(train_depart_date).add(
        delivery_channel.train_arrive_date,
        "day"
      );
      const store_arrive_date = dayjs(train_arrive_date).add(
        delivery_channel.store_arrive_date,
        "day"
      );
      return {
        eta: item.eta,
        date_do: item.date_do,
        declaration_issue_date,
        train_arrive_date,
        train_depart_date,
        store_arrive_date,
        eta_update: item.eta_update,
        date_do_update: item.date_do_update,
        declaration_issue_date_update: true,
        train_depart_date_update: false,
        train_arrive_date_update: false,
        store_arrive_date_update: false,
      };
    } else if (dateType === 4) {
      const train_depart_date = req.body.train_depart_date;
      const train_arrive_date = dayjs(train_depart_date).add(
        delivery_channel.train_arrive_date,
        "day"
      );
      const store_arrive_date = dayjs(train_arrive_date).add(
        delivery_channel.store_arrive_date,
        "day"
      );
      return {
        eta: item.eta,
        date_do: item.date_do,
        declaration_issue_date: item.declaration_issue_date,
        train_depart_date,
        train_arrive_date,
        store_arrive_date,
        eta_update: item.eta_update,
        date_do_update: item.date_do_update,
        declaration_issue_date_update: item.declaration_issue_date_update,
        train_depart_date_update: true,
        train_arrive_date_update: false,
        store_arrive_date_update: false,
      };
    } else if (dateType === 5) {
      const train_arrive_date = req.body.train_arrive_date;
      const store_arrive_date = dayjs(train_arrive_date).add(
        delivery_channel.store_arrive_date,
        "day"
      );
      return {
        eta: item.eta,
        date_do: item.date_do,
        declaration_issue_date: item.declaration_issue_date,
        train_depart_date: item.train_depart_date,
        train_arrive_date,
        store_arrive_date,
        eta_update: item.eta_update,
        date_do_update: item.date_do_update,
        declaration_issue_date_update: item.declaration_issue_date_update,
        train_depart_date_update: item.train_depart_date_update,
        train_arrive_date_update: true,
        store_arrive_date_update: false,
      };
    } else if (dateType === 6) {
      const store_arrive_date = req.body.store_arrive_date;
      return {
        eta: item.eta,
        date_do: item.date_do,
        declaration_issue_date: item.declaration_issue_date,
        train_depart_date: item.train_depart_date,
        train_arrive_date: item.train_arrive_date,
        store_arrive_date,
        eta_update: item.eta_update,
        date_do_update: item.date_do_update,
        declaration_issue_date_update: item.declaration_issue_date_update,
        train_depart_date_update: item.train_depart_date_update,
        train_arrive_date_update: item.train_arrive_date_update,
        store_arrive_date_update: true,
      };
    }
  }
}

module.exports = new FormulaService();
