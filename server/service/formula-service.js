const dayjs = require("dayjs");

class FormulaService {
  dateFormula(delivery_method, etd, store_delivery_time) {
    if (delivery_method && etd) {
      const eta = (delivery_method) => {
        if (delivery_method === "sea_vld") {
          return dayjs(etd).add(5, "day");
        } else if (
          delivery_method === "sea_spb" ||
          delivery_method === "sea_new_ros" ||
          delivery_method === "sea_riga" ||
          delivery_method === "sea_kotka"
        ) {
          return dayjs(etd).add(40, "day");
        } else {
          return dayjs(etd).add(21, "day");
        }
      };

      const date_do = () => {
        return dayjs(eta(delivery_method)).add(5, "day");
      };

      const declaration_issue_date = () => {
        return dayjs(date_do()).add(5, "day");
      };

      const train_arrive_date = () => {
        return dayjs(declaration_issue_date()).add(14, "day");
      };

      const store_arrive_date = () => {
        return dayjs(train_arrive_date()).add(store_delivery_time, "day");
      };

      return {
        eta: eta(delivery_method),
        date_do: date_do(),
        declaration_issue_date: declaration_issue_date(),
        train_arrive_date: train_arrive_date(),
        store_arrive_date: store_arrive_date(),
      };
    } else
      return {
        eta: null,
        date_do: null,
        declaration_issue_date: null,
        train_arrive_date: null,
        store_arrive_date: null,
      };
  }

  updateDateFormulaEta(eta)
}

module.exports = new FormulaService();
