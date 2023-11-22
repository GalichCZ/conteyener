const BidColumns = {
  "Способ доставки": "delivery_method",
  Направление: "direction",
  Склад: "store",
  Агент: "agent",
  "Место отправки": "place_of_dispatch",
  Линия: "line",
  "Дата готовности\t": "ready_date",
  "Дата загрузки": "load_date",
  ETD: "etd",
  ETA: "eta",
  "Дата ДО": "date_do",
  Порт: "port",
  "Фрахтовый счет": "fraht",
  "Номер декларации": "declaration_number",
  "Дата выпуска декларации": "declaration_issue_date",
  Экспедитор: "expeditor",
  "Станция прибытия": "destination_station",
  "Осталось км до ст. назначения": "km_to_dist",
  "Дата отправки по ЖД": "train_depart_date",
  "Дата прибытия по ЖД": "train_arrive_date",
  Автовывоз: "pickup",
  "Дата прибытия на склад": "store_arrive_date",
};

const datesColumns = {
  "Дата готовности\t": null,
  "Дата загрузки": null,
  ETD: null,
  ETA: "eta_update",
  "Дата ДО": "date_do_update",
  "Дата выпуска декларации": "declaration_issue_date_update",
  "Дата отправки по ЖД": "train_depart_date_update",
  "Дата прибытия по ЖД": "train_arrive_date_update",
  "Дата прибытия на склад": "store_arrive_date_update",
};

module.exports = { BidColumns, datesColumns };
