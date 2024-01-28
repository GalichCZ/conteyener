const DeliveryChannelSchema = require("../models/deliveryChannel-model");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
const { setTime } = require("../utils/setTime")
const { addDayToDate } = require("../utils/addDayToDate");
class FormulaService {

  calculateDates (startDate, daysToAdd) {
    return daysToAdd === 0 ? null : addDayToDate(startDate, daysToAdd);
  };
  
  async updatedDateFormula(_etd, _delivery_channel, item) {
    try {
      if (_delivery_channel && _etd) {
        const delivery_channel = await DeliveryChannelSchema.findById(
          _delivery_channel
        ).exec();

        const calculateDate = (baseDate, fetchedDate, valueToAdd) => {
          return baseDate ? addDayToDate(baseDate, fetchedDate) : addDayToDate(valueToAdd, fetchedDate)
        }

        const eta = setTime(dayjs(_etd)
          .add(delivery_channel.eta, "day"))

        const date_do = calculateDate(item.eta_update, delivery_channel.date_do, eta)

        const declaration_issue_date = calculateDate(item.date_do_update, delivery_channel.declaration_issue_date, date_do)

        const train_depart_date = calculateDate(item.declaration_issue_date_update, delivery_channel.train_depart_date, declaration_issue_date)

        const train_arrive_date = calculateDate(item.train_depart_date_update, delivery_channel.train_arrive_date, train_depart_date)

        const store_arrive_date = calculateDate(item.train_arrive_date_update, delivery_channel.store_arrive_date, train_arrive_date)

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

        const eta = this.calculateDates(_etd, delivery_channel.eta)
        const date_do = this.calculateDates(eta, delivery_channel.date_do);
        const declaration_issue_date = this.calculateDates(date_do, delivery_channel.declaration_issue_date);
        const train_depart_date = this.calculateDates(declaration_issue_date, delivery_channel.train_depart_date);
        const train_arrive_date = this.calculateDates(train_depart_date, delivery_channel.train_arrive_date);
        const store_arrive_date = this.calculateDates(train_arrive_date, delivery_channel.store_arrive_date);

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
        )}\nDateFormula ERROR:\n${error}`
      );
    }
  }

  async updateFormulaDates(newDate, dateType, item, deliveryChannel) {
    try {
      const delivery_channel = await DeliveryChannelSchema.findById(
        deliveryChannel
      ).exec();

      const {
        eta_update,
        date_do_update,
        declaration_issue_date_update,
        train_depart_date_update,
        train_arrive_date_update,
        eta: etaOld,
        date_do: dateDoOld,
        declaration_issue_date: declarationIssueDateOld,
        train_depart_date: trainDepartDateOld,
        train_arrive_date: trainArriveDateOld,
      } = item

      const returnOldDate = (days, oldDate) => {
        return days === 0 ? null : oldDate
      }

      if (dateType === 1) {
        const eta = this.calculateDates(newDate, delivery_channel.eta)
        const date_do = this.calculateDates(eta, delivery_channel.date_do);
        const declaration_issue_date = this.calculateDates(date_do, delivery_channel.declaration_issue_date);
        const train_depart_date = this.calculateDates(declaration_issue_date, delivery_channel.train_depart_date);
        const train_arrive_date = this.calculateDates(train_depart_date, delivery_channel.train_arrive_date);
        const store_arrive_date = this.calculateDates(train_arrive_date, delivery_channel.store_arrive_date);

        return {
          eta,
          date_do,
          declaration_issue_date,
          train_arrive_date,
          train_depart_date,
          store_arrive_date,
          eta_update: false,
          date_do_update: false,
          declaration_issue_date_update: false,
          train_depart_date_update: false,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 2) {
        const date_do = this.calculateDates(newDate, delivery_channel.date_do);
        const declaration_issue_date = this.calculateDates(date_do, delivery_channel.declaration_issue_date);
        const train_depart_date = this.calculateDates(declaration_issue_date, delivery_channel.train_depart_date);
        const train_arrive_date = this.calculateDates(train_depart_date, delivery_channel.train_arrive_date);
        const store_arrive_date = this.calculateDates(train_arrive_date, delivery_channel.store_arrive_date);

        return {
          eta: returnOldDate(delivery_channel.eta, newDate),
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
      } else if (dateType === 3) {
        const declaration_issue_date = this.calculateDates(newDate, delivery_channel.declaration_issue_date);
        const train_depart_date = this.calculateDates(declaration_issue_date, delivery_channel.train_depart_date);
        const train_arrive_date = this.calculateDates(train_depart_date, delivery_channel.train_arrive_date);
        const store_arrive_date = this.calculateDates(train_arrive_date, delivery_channel.store_arrive_date);
        return {
          eta: returnOldDate(delivery_channel.eta, etaOld),
          date_do: returnOldDate(delivery_channel.date_do, newDate),
          declaration_issue_date,
          train_arrive_date,
          train_depart_date,
          store_arrive_date,
          eta_update: eta_update,
          date_do_update: true,
          declaration_issue_date_update: false,
          train_depart_date_update: false,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 4) {
        const train_depart_date = this.calculateDates(newDate, delivery_channel.train_depart_date);
        const train_arrive_date = this.calculateDates(train_depart_date, delivery_channel.train_arrive_date);
        const store_arrive_date = this.calculateDates(train_arrive_date, delivery_channel.store_arrive_date);
        return {
          eta: returnOldDate(delivery_channel.eta, etaOld),
          date_do: returnOldDate(delivery_channel.date_do, dateDoOld),
          declaration_issue_date: returnOldDate(delivery_channel.declaration_issue_date, newDate),
          train_arrive_date,
          train_depart_date,
          store_arrive_date,
          eta_update,
          date_do_update,
          declaration_issue_date_update: true,
          train_depart_date_update: false,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 5) {
        const train_arrive_date = this.calculateDates(newDate, delivery_channel.train_arrive_date);
        const store_arrive_date = this.calculateDates(train_arrive_date, delivery_channel.store_arrive_date);
        return {
          eta: returnOldDate(delivery_channel.eta, etaOld),
          date_do: returnOldDate(delivery_channel.date_do, dateDoOld),
          declaration_issue_date: returnOldDate(delivery_channel.declaration_issue_date, declarationIssueDateOld),
          train_depart_date: returnOldDate(delivery_channel.train_depart_date, newDate),
          train_arrive_date,
          store_arrive_date,
          eta_update,
          date_do_update,
          declaration_issue_date_update,
          train_depart_date_update: true,
          train_arrive_date_update: false,
          store_arrive_date_update: false,
        };
      } else if (dateType === 6) {
        const store_arrive_date = this.calculateDates(newDate, delivery_channel.store_arrive_date);
        return {
          eta: returnOldDate(delivery_channel.eta, etaOld),
          date_do: returnOldDate(delivery_channel.date_do, dateDoOld),
          declaration_issue_date: returnOldDate(delivery_channel.declaration_issue_date, declarationIssueDateOld),
          train_depart_date: returnOldDate(delivery_channel.train_depart_date, trainDepartDateOld),
          train_arrive_date: returnOldDate(delivery_channel.train_arrive_date, newDate),
          store_arrive_date,
          eta_update,
          date_do_update,
          declaration_issue_date_update,
          train_depart_date_update,
          train_arrive_date_update: true,
          store_arrive_date_update: false,
        };
      } else if (dateType === 7) {
        return {
          eta: returnOldDate(delivery_channel.eta, etaOld),
          date_do: returnOldDate(delivery_channel.date_do, dateDoOld),
          declaration_issue_date: returnOldDate(delivery_channel.declaration_issue_date, declarationIssueDateOld),
          train_depart_date: returnOldDate(delivery_channel.train_depart_date, trainDepartDateOld),
          train_arrive_date: returnOldDate(delivery_channel.train_arrive_date, trainArriveDateOld),
          store_arrive_date:returnOldDate(delivery_channel.store_arrive_date, newDate),
          eta_update,
          date_do_update,
          declaration_issue_date_update,
          train_depart_date_update,
          train_arrive_date_update,
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
