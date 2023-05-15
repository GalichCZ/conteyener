import { IItem } from "../../../../../Types/Types";

export function checkDuplicate(singleItem: IItem, key: string) {
  let duplicates: string[] = [];

  singleItem[key].forEach((order: string, index: number) => {
    if (
      singleItem[key].indexOf(order, index + 1) !== -1 &&
      duplicates.indexOf(order) === -1
    ) {
      duplicates.push(order);
    }
  });

  if (duplicates.length > 0) return { success: false, duplicates };
  else return { success: true };
}
