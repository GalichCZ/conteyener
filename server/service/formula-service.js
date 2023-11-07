const DeliveryChannelSchema = require("../models/deliveryChannel-model");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
class FormulaService {
  async updatedDateFormula(_etd, _delivery_channel, item) {
    try {
      if (_delivery_channel && _etd) {
        const delivery_channel = await DeliveryChannelSchema.findById(
          _delivery_channel
        ).exec();

        const eta = dayjs(_etd)
          .add(delivery_channel.eta, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);

        const date_do = !item.eta_update
          ? dayjs(eta)
              .add(delivery_channel.date_do, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
          : dayjs(item.eta)
              .add(delivery_channel.date_do, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0);

        const declaration_issue_date = !item.date_do_update
          ? dayjs(date_do)
              .add(delivery_channel.declaration_issue_date, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
          : dayjs(item.date_do).add(
              delivery_channel.declaration_issue_date,
              "day"
            );

        const train_depart_date = !item.declaration_issue_date_update
          ? dayjs(declaration_issue_date)
              .add(delivery_channel.train_depart_date, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
          : dayjs(item.declaration_issue_date)
              .add(delivery_channel.train_depart_date, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0);

        const train_arrive_date = !item.train_depart_date_update
          ? dayjs(train_depart_date)
              .add(delivery_channel.train_arrive_date, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
          : dayjs(item.train_depart_date)
              .add(delivery_channel.train_arrive_date, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0);

        const store_arrive_date = !item.train_arrive_date
          ? dayjs(train_arrive_date)
              .add(delivery_channel.store_arrive_date, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
          : dayjs(item.train_arrive_date)
              .add(delivery_channel.store_arrive_date, "day")
              .set("hour", 13)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0);

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
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nupdatedDateFormula ERROR:\n${error}`
      );
    }
  }
  async dateFormula(_etd, _delivery_channel) {
    try {
      if (_delivery_channel && _etd) {
        const delivery_channel = await DeliveryChannelSchema.findById(
          _delivery_channel
        ).exec();

        const eta = dayjs(_etd)
          .add(delivery_channel.eta, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);

        const date_do = dayjs(eta)
          .add(delivery_channel.date_do, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);

        const declaration_issue_date = dayjs(date_do)
          .add(delivery_channel.declaration_issue_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);

        const train_depart_date = dayjs(declaration_issue_date)
          .add(delivery_channel.train_depart_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);

        const train_arrive_date = dayjs(train_depart_date)
          .add(delivery_channel.train_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);

        const store_arrive_date = dayjs(train_arrive_date)
          .add(delivery_channel.store_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);

        return {
          eta: delivery_channel.eta === 0 ? null : eta,
          date_do: delivery_channel.date_do === 0 ? null : date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0 ? null : train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0 ? null : train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
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
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDateFormula ERROR:\n${error}`
      );
    }
  }

  async updateFormulaDates(newDate, dateType, item, deliveryChannel) {
    try {
      const delivery_channel = await DeliveryChannelSchema.findById(
        deliveryChannel
      ).exec();
      if (dateType === 1) {
        const etd = newDate;
        const eta = dayjs(etd)
          .add(delivery_channel.eta, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const date_do = dayjs(eta)
          .add(delivery_channel.date_do, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const declaration_issue_date = dayjs(date_do)
          .add(delivery_channel.declaration_issue_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const train_depart_date = dayjs(declaration_issue_date)
          .add(delivery_channel.train_depart_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const train_arrive_date = dayjs(train_depart_date)
          .add(delivery_channel.train_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const store_arrive_date = dayjs(train_arrive_date)
          .add(delivery_channel.store_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        return {
          eta: delivery_channel.eta === 0 ? null : eta,
          date_do: delivery_channel.date_do === 0 ? null : date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0 ? null : train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0 ? null : train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
          eta_update: true,
          date_do_update: false,
          declaration_issue_date_update: false,
          train_depart_date_update: false,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 2) {
        const eta = newDate;
        const date_do = dayjs(eta)
          .add(delivery_channel.date_do, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const declaration_issue_date = dayjs(date_do)
          .add(delivery_channel.declaration_issue_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const train_depart_date = dayjs(declaration_issue_date)
          .add(delivery_channel.train_depart_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const train_arrive_date = dayjs(train_depart_date)
          .add(delivery_channel.train_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const store_arrive_date = dayjs(train_arrive_date)
          .add(delivery_channel.store_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        return {
          eta: delivery_channel.eta === 0 ? null : eta,
          date_do: delivery_channel.date_do === 0 ? null : date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0 ? null : train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0 ? null : train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
          eta_update: true,
          date_do_update: false,
          declaration_issue_date_update: false,
          train_depart_date_update: false,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 3) {
        const date_do = newDate;
        const declaration_issue_date = dayjs(date_do)
          .add(delivery_channel.declaration_issue_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const train_depart_date = dayjs(declaration_issue_date)
          .add(delivery_channel.train_depart_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const train_arrive_date = dayjs(train_depart_date)
          .add(delivery_channel.train_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const store_arrive_date = dayjs(train_arrive_date)
          .add(delivery_channel.store_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        return {
          eta: delivery_channel.eta === 0 ? null : item.eta,
          date_do: delivery_channel.date_do === 0 ? null : date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0 ? null : train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0 ? null : train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
          eta_update: item.eta_update,
          date_do_update: true,
          declaration_issue_date_update: false,
          train_depart_date_update: false,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 4) {
        const declaration_issue_date = newDate;
        const train_depart_date = dayjs(declaration_issue_date)
          .add(delivery_channel.train_depart_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const train_arrive_date = dayjs(train_depart_date)
          .add(delivery_channel.train_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const store_arrive_date = dayjs(train_arrive_date)
          .add(delivery_channel.store_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        return {
          eta: delivery_channel.eta === 0 ? null : item.eta,
          date_do: delivery_channel.date_do === 0 ? null : item.date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0 ? null : train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0 ? null : train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
          eta_update: item.eta_update,
          date_do_update: item.date_do_update,
          declaration_issue_date_update: true,
          train_depart_date_update: false,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 5) {
        const train_depart_date = newDate;
        const train_arrive_date = dayjs(train_depart_date)
          .add(delivery_channel.train_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        const store_arrive_date = dayjs(train_arrive_date)
          .add(delivery_channel.store_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        return {
          eta: delivery_channel.eta === 0 ? null : item.eta,
          date_do: delivery_channel.date_do === 0 ? null : item.date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : item.declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0 ? null : train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0 ? null : train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
          eta_update: item.eta_update,
          date_do_update: item.date_do_update,
          declaration_issue_date_update: item.declaration_issue_date_update,
          train_depart_date_update: true,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 6) {
        const train_arrive_date = newDate;
        const store_arrive_date = dayjs(train_arrive_date)
          .add(delivery_channel.store_arrive_date, "day")
          .set("hour", 13)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
        return {
          eta: delivery_channel.eta === 0 ? null : item.eta,
          date_do: delivery_channel.date_do === 0 ? null : item.date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : item.declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0 ? null : train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0
              ? null
              : item.train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
          eta_update: item.eta_update,
          date_do_update: item.date_do_update,
          declaration_issue_date_update: item.declaration_issue_date_update,
          train_depart_date_update: item.train_depart_date_update,
          train_arrive_date_update: true,
          store_arrive_date_update: false,
        };
      } else if (dateType === 7) {
        const store_arrive_date = newDate;
        return {
          eta: delivery_channel.eta === 0 ? null : item.eta,
          date_do: delivery_channel.date_do === 0 ? null : item.date_do,
          declaration_issue_date:
            delivery_channel.declaration_issue_date === 0
              ? null
              : item.declaration_issue_date,
          train_arrive_date:
            delivery_channel.train_arrive_date === 0
              ? null
              : item.train_arrive_date,
          train_depart_date:
            delivery_channel.train_depart_date === 0
              ? null
              : item.train_depart_date,
          store_arrive_date:
            delivery_channel.store_arrive_date === 0 ? null : store_arrive_date,
          eta_update: item.eta_update,
          date_do_update: item.date_do_update,
          declaration_issue_date_update: item.declaration_issue_date_update,
          train_depart_date_update: item.train_depart_date_update,
          train_arrive_date_update: item.train_arrive_date_update,
          store_arrive_date_update: true,
        };
      }
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nupdateFormulaDates ERROR:\n${error}`
      );
    }
  }
}

module.exports = new FormulaService();
