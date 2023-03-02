import { IItem } from "../../../../../Types/Types";

export const handleProviderChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newProviders = singleItem.providers.map((item, i) => {
    if (i === index) {
      return {
        ...singleItem.providers[index],
        name: event.target.value,
      };
    }

    return item;
  });
  newProviders[index].name = event.target.value;
  setSingleItem({ ...singleItem, providers: newProviders });
};

export const handleAddProvider = (
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  setSingleItem({
    ...singleItem,
    providers: [...singleItem.providers, { name: "" }],
  });
};

export const handleDeleteProvider = (
  index: number,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newProviders = [...singleItem.providers];
  newProviders.splice(index, 1);
  setSingleItem({ ...singleItem, providers: newProviders });
};

export const handleDeclarationNumberChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newDeclarationNumbers = [...singleItem.declaration_number];
  newDeclarationNumbers[index] = event.target.value;
  setSingleItem({ ...singleItem, declaration_number: newDeclarationNumbers });
};

export const handleAddDeclarationNumber = (
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  setSingleItem({
    ...singleItem,
    declaration_number: [...singleItem.declaration_number, ""],
  });
};

export const handleDeleteDeclarationNumber = (
  index: number,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newDeclarationNumbers = [...singleItem.declaration_number];
  newDeclarationNumbers.splice(index, 1);
  setSingleItem({ ...singleItem, declaration_number: newDeclarationNumbers });
};

export const handleImporterChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newImporters = singleItem.importers.map((item, i) => {
    if (i === index) {
      return {
        ...singleItem.importers[index],
        name: event.target.value,
      };
    }

    return item;
  });
  newImporters[index].name = event.target.value;
  setSingleItem({ ...singleItem, importers: newImporters });
};

export const handleAddImporter = (
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  setSingleItem({
    ...singleItem,
    importers: [...singleItem.importers, { name: "" }],
  });
};

export const handleDeleteImporter = (
  index: number,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newImporters = [...singleItem.importers];
  newImporters.splice(index, 1);
  setSingleItem({ ...singleItem, importers: newImporters });
};

export const handleOrderChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newOrders = singleItem.order_number.map((item, i) => {
    if (i === index) {
      return {
        ...singleItem.order_number[index],
        number: event.target.value,
      };
    }

    return item;
  });
  newOrders[index].number = event.target.value;
  setSingleItem({ ...singleItem, order_number: newOrders });
};

export const handleAddOrder = (
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  setSingleItem({
    ...singleItem,
    order_number: [...singleItem.order_number, { number: "" }],
  });
};

export const handleDeleteOrder = (
  index: number,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newOrders = [...singleItem.order_number];
  newOrders.splice(index, 1);
  setSingleItem({ ...singleItem, order_number: newOrders });
};
