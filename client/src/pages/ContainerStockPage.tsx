import React from "react";
import { ContainerStockCreate } from "../Modules/ContainerStock/Components/ContainerStockCreate";
import { ContainerStockDraw } from "../Modules/ContainerStock/Components/ContainerStockDraw";

export const ContainerStockPage = () => {
  return (
    <section className="stock-page">
      <ContainerStockCreate />
      <ContainerStockDraw />
    </section>
  );
};
