import { IRoles } from "@/Types/Types";

const Roles: IRoles = {
  manager_patriot: [
    "request_date",
    "inside_number",
    "proform_number",
    "order_number",
    "container_number",
    "simple_product_name",
    "delivery_method",
    "provider",
    "importer",
    "direction",
    "store_name",
    "agent",
    "container_type",
    "ready_date",
    "load_date",
    "is_docs",
    "declaration_number",
    "declaration_issue_date",
    "km_to_dist",
    "train_depart_date",
    "train_arrive_date",
  ],
  manager_buyer: [
    "request_date",
    "inside_number",
    "proform_number",
    "order_number",
    "container_number",
    "simple_product_name",
    "delivery_method",
    "provider",
    "importer",
    "direction",
    "store_name",
    "container_type",
    "ready_date",
    "load_date",
    "declaration_number",
    "declaration_issue_date",
    "km_to_dist",
    "train_depart_date",
    "train_arrive_date",
  ],
  head: ["all"],
  manager_int: ["all"],
  manager_sales: [
    //5
    "inside_number",
    "proform_number",
    "order_number",
    "container_number",
    "simple_product_name",
    "direction",
    "store_name",
    "load_date",
    "km_to_dist",
  ],
  manager_treasury: [
    //6
    "inside_number",
    "proform_number",
    "order_number",
    "container_number",
    "provider",
    "importer",
    "declaration_number",
  ],
  manager_store: [
    //7
    "inside_number",
    "proform_number",
    "order_number",
    "container_number",
    "simple_product_name",
    "direction",
    "store_name",
    "container_type",
  ],
};

export const checkRole = (role: string | undefined, column_name: string) => {
  if ((role && role === "head") || role === "manager_int") return true;
  if (role && Roles[role]?.find((col) => col === column_name)) return true;
  return false;
};
