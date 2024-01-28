const dateTypeMap = {
  1: 'etd',
  2: 'eta',
  3: 'date_do',
  4: 'declaration_issue_date',
  5: 'train_depart_date',
  6: 'train_arrive_date',
  7: 'store_arrive_date'
}

class DateNameByType {
  getDateNameByType(dateType) {
    return dateTypeMap[dateType]
  }
}

module.exports = new DateNameByType();
