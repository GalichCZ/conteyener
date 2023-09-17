class DateNameByType {
  getDateNameByType(dateType) {
    switch (dateType) {
      case 1:
        return "etd";
      case 2:
        return "eta";
      case 3:
        return "declaration_issue_date";
      case 4:
        return "train_depart_date";
      case 5:
        return "train_arrive_date";
      case 6:
        return "store_arrive_date";
    }
  }
}

module.exports = new DateNameByType();
