import React, { useState } from "react";

// choose delivery method or get it from item
// + do date
// + declaration issue date
// + train arrive date
// + store arrive date

interface IDeliveryChannel {
  delivery_method: string;
  store: string;
}

export const DeliveryChannel: React.FC<IDeliveryChannel> = ({
  delivery_method,
  store,
}) => {
  const [channel, setChannel] = useState({
    delivery_method,
    do_date: 0,
    declaration_issue_date: 0,
    train_arrive_date: 0,
    store_arrive_date: 0,
  });

  return <div>DeliveryChannel</div>;
};
