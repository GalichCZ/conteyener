import React from "react";
import { Table, TableItemCreate } from "../components/index";
import { Cat, ColumnDefinitionType } from "../components/Table/Types";

const items = [
  {
    _id: "63746fb7d938e62729d7727d",
    request_date: "2022-12-08T23:00:00.000Z",
    invoice_number: "invoice2",
    container: {
      container_number: "1",
      container_type: "H20",
      _id: "63746fb7d938e62729d7726d",
      createdAt: "2022-11-16T05:05:59.015Z",
      updatedAt: "2022-11-16T05:05:59.015Z",
      __v: 0,
    },
    importers: [
      {
        name: "importer1",
        container: "63746fb7d938e62729d7726d",
        _id: "63746fb7d938e62729d77275",
        createdAt: "2022-11-16T05:05:59.218Z",
        updatedAt: "2022-11-16T05:05:59.218Z",
        __v: 0,
      },
      {
        name: "importer2",
        container: "63746fb7d938e62729d7726d",
        _id: "63746fb7d938e62729d77276",
        createdAt: "2022-11-16T05:05:59.219Z",
        updatedAt: "2022-11-16T05:05:59.219Z",
        __v: 0,
      },
      {
        name: "importer3",
        container: "63746fb7d938e62729d7726d",
        _id: "63746fb7d938e62729d77277",
        createdAt: "2022-11-16T05:05:59.219Z",
        updatedAt: "2022-11-16T05:05:59.219Z",
        __v: 0,
      },
    ],
    providers: [
      {
        name: "postavshik1",
        container: "63746fb7d938e62729d7726d",
        _id: "63746fb7d938e62729d7726f",
        createdAt: "2022-11-16T05:05:59.099Z",
        updatedAt: "2022-11-16T05:05:59.099Z",
        __v: 0,
      },
      {
        name: "postavshik2",
        container: "63746fb7d938e62729d7726d",
        _id: "63746fb7d938e62729d77270",
        createdAt: "2022-11-16T05:05:59.099Z",
        updatedAt: "2022-11-16T05:05:59.099Z",
        __v: 0,
      },
      {
        name: "postavshik3",
        container: "63746fb7d938e62729d7726d",
        _id: "63746fb7d938e62729d77271",
        createdAt: "2022-11-16T05:05:59.099Z",
        updatedAt: "2022-11-16T05:05:59.099Z",
        __v: 0,
      },
    ],
    store: {
      name: "  store",
      address: "store address",
      contact: "store contact",
      _id: "63746fb7d938e62729d7727b",
      createdAt: "2022-11-16T05:05:59.459Z",
      updatedAt: "2022-11-16T05:05:59.459Z",
      __v: 0,
    },
    conditions: "good conditions",
    line: "straight line",
    agent: "agent 1",
    fraht: "fraht 1",
    expeditor: "expeditor 1",
    bid: 12341234,
    delivery_method: "train",
    place_of_dispatch: "China",
    arrive_place: "Russia",
    arrive_date: "2022-12-10T23:00:00.000Z",
    date_do: "2022-12-11T23:00:00.000Z",
    is_ds: true,
    is_docs: true,
    declaration_submit_date: "2022-12-12T23:00:00.000Z",
    declaration_number: "123qwe456rt143425y",
    declaration_issue_date: "2022-12-13T23:00:00.000Z",
    train_dispatch_date: "2022-12-14T23:00:00.000Z",
    train_arrive_date: "2022-12-15T23:00:00.000Z",
    destination_station: "Petushki",
    km_to_dist: 123,
    store_arrive_date: "2022-12-16T23:00:00.000Z",
    note: "intersting note!",
    creator: "63746f46d938e62729d77269",
    createdAt: "2022-11-16T05:05:59.622Z",
    updatedAt: "2022-11-16T05:05:59.622Z",
    __v: 0,
  },
];

export const TablePage = () => {
  return (
    <section className="table-page">
      <TableItemCreate />
      <Table data={items} />
    </section>
  );
};
