import { IItem } from "../../../../../Types/Types";

export function checkDuplicateOrders(singleItem: IItem) {
  let duplicates: string[] = [];

  singleItem.order_number.forEach((order, index) => {
    if (
      singleItem.order_number.indexOf(order, index + 1) !== -1 &&
      duplicates.indexOf(order) === -1
    ) {
      duplicates.push(order);
    }
  });

  if (duplicates.length > 0) return { success: false, duplicates };
  else return { success: true };
}

export function checkDuplicateDeclarations(singleItem: IItem) {
  let duplicates: string[] = [];

  singleItem.declaration_number.forEach((number, index) => {
    if (
      singleItem.declaration_number.indexOf(number, index + 1) !== -1 &&
      duplicates.indexOf(number) === -1
    ) {
      duplicates.push(number);
    }
  });
  console.log(duplicates);
  if (duplicates.length > 0) return { success: false, duplicates };
  else return { success: true };
}
