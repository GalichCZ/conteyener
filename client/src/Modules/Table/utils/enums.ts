export enum DateNames {
    "request_date",
    "ready_date",
    "load_date",
    "etd",
    "eta",
    "release",
    "date_do",
    "declaration_issue_date",
    "availability_of_ob",
    "answer_of_ob",
    "train_depart_date",
    "train_arrive_date",
    "store_arrive_date_update",
  }

export type DateNamesType = keyof typeof DateNames;