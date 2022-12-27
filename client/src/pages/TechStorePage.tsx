import React, { useState } from "react";
import {
  TechStoreCreate,
  TechStoreDraw,
  TechStoreModal,
} from "../components/index";
import { TechStoreData } from "../Types/Types";

export const TechStorePage = () => {
  const [status, setStatus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<TechStoreData>({
    delivery_time: 0,
    address: "",
    name: "",
    _id: "",
  });

  console.log(data);

  return (
    <section className="users-page">
      <TechStoreModal
        setStatus={setStatus}
        dataStore={data}
        open={open}
        setOpen={setOpen}
      />
      <TechStoreCreate setStatus={setStatus} />
      <TechStoreDraw
        setData={setData}
        status={status}
        setOpen={setOpen}
        setStatus={setStatus}
      />
    </section>
  );
};
