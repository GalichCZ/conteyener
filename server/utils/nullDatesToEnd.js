const datesNames = {
  request_date: 'request_date',
  ready_date: 'ready_date',
  load_date: 'load_date',
  availability_of_ob: 'availability_of_ob',
  answer_of_ob: 'answer_of_ob',
  date_do: 'date_do',
  eta: 'eta',
  etd: 'etd',
  train_depart_date: 'train_depart_date',
  train_arrive_date: 'train_arrive_date',
  store_arrive_date: 'store_arrive_date',
  declaration_issue_date: 'declaration_issue_date',
}

const nullDatesToEnd = (items, key) => {
  if (!datesNames[key]) return items

  const nullDates = []
  const nonNullDates = []

  items.forEach((item) => {
    if (item[key] === null) {
      nullDates.push(item)
    } else {
      nonNullDates.push(item)
    }
  })

  return nonNullDates.concat(nullDates)
}

module.exports = { nullDatesToEnd }
