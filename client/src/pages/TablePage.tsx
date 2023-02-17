import { Table } from "../components/index";
import { TableItemCreate } from "../Modules/Table/Components/TableItemCreate";

export const TablePage = () => {
  return (
    <section className="table-page">
      <TableItemCreate />
      <Table />
    </section>
  );
};
