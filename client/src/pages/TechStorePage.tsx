import React from "react";
import { TechStoreCreate, TechStoreDraw } from "../components/index";

export const TechStorePage = () => {
  return (
    <section className="users-page">
      <TechStoreCreate />
      <TechStoreDraw />
    </section>
  );
};
