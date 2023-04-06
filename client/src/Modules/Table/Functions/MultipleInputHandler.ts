import { IItem, INewItem } from "../../../Types/Types";

export const handleInsideNumberChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newInsideNumbers = [...singleItem.inside_number];
  newInsideNumbers[index] = event.target.value;
  setSingleItem({ ...singleItem, inside_number: newInsideNumbers });
};
export const handleAddInsideNumber = (
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  setSingleItem({
    ...singleItem,
    inside_number: [...singleItem.inside_number, ""],
  });
};
export const handleDeleteInsideNumber = (
  index: number,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newInsideNumbers = [...singleItem.inside_number];
  newInsideNumbers.splice(index, 1);
  setSingleItem({ ...singleItem, inside_number: newInsideNumbers });
};

export const handleProformNumberChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newProformNumbers = [...singleItem.proform_number];
  newProformNumbers[index] = event.target.value;
  setSingleItem({ ...singleItem, proform_number: newProformNumbers });
};
export const handleAddProformNumber = (
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  setSingleItem({
    ...singleItem,
    proform_number: [...singleItem.proform_number, ""],
  });
};
export const handleDeleteProformNumber = (
  index: number,
  singleItem: IItem,
  setSingleItem: (c: IItem) => void
) => {
  const newProformNumbers = [...singleItem.proform_number];
  newProformNumbers.splice(index, 1);
  setSingleItem({ ...singleItem, proform_number: newProformNumbers });
};

export const handleProviderChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void,
  item?: INewItem,
  setItem?: (c: INewItem) => void
) => {
  if (singleItem && setSingleItem) {
    const newProviders = [...singleItem.providers];
    newProviders[index] = event.target.value;
    setSingleItem({ ...singleItem, providers: newProviders });
  }
  if (item && setItem) {
    const newProviders = [...item.providers];
    newProviders[index] = event.target.value;
    setItem({ ...item, providers: newProviders });
  }
};
export const handleAddProvider = (
  item?: INewItem,
  setItem?: (c: INewItem) => void,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void
) => {
  if (singleItem && setSingleItem) {
    setSingleItem({
      ...singleItem,
      providers: [...singleItem.providers, ""],
    });
  }
  if (item && setItem) {
    setItem({ ...item, providers: [...item.providers, ""] });
  }
};
export const handleDeleteProvider = (
  index: number,
  item?: INewItem,
  setItem?: (c: INewItem) => void,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void
) => {
  if (singleItem && setSingleItem) {
    const newProviders = [...singleItem.providers];
    newProviders.splice(index, 1);
    setSingleItem({ ...singleItem, providers: newProviders });
  }
  if (item && setItem) {
    const newProviders = [...item.providers];
    newProviders.splice(index, 1);
    setItem({ ...item, providers: newProviders });
  }
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
  item?: INewItem,
  setItem?: (c: INewItem) => void,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void
) => {
  if (singleItem && setSingleItem) {
    const newImporters = [...singleItem.importers];
    newImporters[index] = event.target.value;
    setSingleItem({ ...singleItem, importers: newImporters });
  }
  if (item && setItem) {
    const newImporters = [...item.importers];
    newImporters[index] = event.target.value;
    setItem({ ...item, importers: newImporters });
  }
};
export const handleAddImporter = (
  item?: INewItem,
  setItem?: (c: INewItem) => void,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void
) => {
  if (singleItem && setSingleItem) {
    setSingleItem({
      ...singleItem,
      importers: [...singleItem.importers, ""],
    });
  }
  if (item && setItem) {
    setItem({ ...item, importers: [...item.importers, ""] });
  }
};
export const handleDeleteImporter = (
  index: number,
  item?: INewItem,
  setItem?: (c: INewItem) => void,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void
) => {
  if (singleItem && setSingleItem) {
    const newImporters = [...singleItem.importers];
    newImporters.splice(index, 1);
    setSingleItem({ ...singleItem, importers: newImporters });
  }
  if (item && setItem) {
    const newImporters = [...item.importers];
    newImporters.splice(index, 1);
    setItem({ ...item, importers: newImporters });
  }
};

export const handleOrderChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem?: IItem,
  item?: INewItem,
  setSingleItem?: (c: IItem) => void,
  setItem?: (c: INewItem) => void
) => {
  if (setSingleItem && singleItem) {
    const newOrderNumbers = [...singleItem.order_number];
    newOrderNumbers[index] = event.target.value;
    setSingleItem({ ...singleItem, order_number: newOrderNumbers });
  }
  if (setItem && item) {
    const newOrderNumbers = [...item.order_number];
    newOrderNumbers[index] = event.target.value;
    setItem({ ...item, order_number: newOrderNumbers });
  }
};
export const handleAddOrder = (
  item?: INewItem,
  setItem?: (c: INewItem) => void,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void
) => {
  if (singleItem && setSingleItem) {
    setSingleItem({
      ...singleItem,
      order_number: [...singleItem.order_number, ""],
    });
  }
  if (item && setItem) {
    setItem({ ...item, order_number: [...item.order_number, ""] });
  }
};
export const handleDeleteOrder = (
  index: number,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void,
  item?: INewItem,
  setItem?: (c: INewItem) => void
) => {
  if (singleItem && setSingleItem) {
    const newOrders = [...singleItem.order_number];
    newOrders.splice(index, 1);
    setSingleItem({ ...singleItem, order_number: newOrders });
  }
  if (item && setItem) {
    const newOrders = [...item.order_number];
    newOrders.splice(index, 1);
    setItem({ ...item, order_number: newOrders });
  }
};

export const handleConditionsChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  singleItem?: IItem,
  item?: INewItem,
  setSingleItem?: (c: IItem) => void,
  setItem?: (c: INewItem) => void
) => {
  if (setSingleItem && singleItem) {
    const newConditions = [...singleItem.conditions];
    newConditions[index] = event.target.value;
    setSingleItem({ ...singleItem, conditions: newConditions });
  }
  if (setItem && item) {
    const newConditions = [...item.conditions];
    newConditions[index] = event.target.value;
    setItem({ ...item, conditions: newConditions });
  }
};
export const handleAddConditions = (
  item?: INewItem,
  setItem?: (c: INewItem) => void,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void
) => {
  if (singleItem && setSingleItem) {
    setSingleItem({
      ...singleItem,
      conditions: [...singleItem.conditions, ""],
    });
  }
  if (item && setItem) {
    setItem({ ...item, conditions: [...item.conditions, ""] });
  }
};
export const handleDeleteConditions = (
  index: number,
  singleItem?: IItem,
  setSingleItem?: (c: IItem) => void,
  item?: INewItem,
  setItem?: (c: INewItem) => void
) => {
  if (singleItem && setSingleItem) {
    const newConditions = [...singleItem.conditions];
    newConditions.splice(index, 1);
    setSingleItem({ ...singleItem, conditions: newConditions });
  }
  if (item && setItem) {
    const newConditions = [...item.conditions];
    newConditions.splice(index, 1);
    setItem({ ...item, conditions: newConditions });
  }
};
