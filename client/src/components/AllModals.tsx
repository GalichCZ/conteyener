import { lazy } from "react";

const TableDateCalc = lazy(() =>
  import("../Modules/Table/Components/TableDateCalc").then(
    ({ TableDateCalc }) => ({ default: TableDateCalc })
  )
);
const TableDistanceModal = lazy(() =>
  import("../Modules/Table/Components/TableDistanceModal").then(
    ({ TableDistanceModal }) => ({ default: TableDistanceModal })
  )
);
const TableUploadModal = lazy(() =>
  import("../Modules/Table/Components/TableUploadModal").then(
    ({ TableUploadModal }) => ({ default: TableUploadModal })
  )
);
const TableItemUpdate = lazy(() =>
  import(
    "../Modules/Table/Components/TableItemUpdate/Components/TableItemUpdate"
  ).then(({ TableItemUpdate }) => ({ default: TableItemUpdate }))
);
const TableFormulaDate = lazy(() =>
  import("../Modules/Table/Components/TableFormulaDate").then(
    ({ TableFormulaDate }) => ({ default: TableFormulaDate })
  )
);
const TableDeclStatus = lazy(() =>
  import("../Modules/Table/Components/TableDeclStatus").then(
    ({ TableDeclStatus }) => ({
      default: TableDeclStatus,
    })
  )
);
const TableStore = lazy(() =>
  import("../Modules/Table/Components/TableStore").then(({ TableStore }) => ({
    default: TableStore,
  }))
);
const TableComment = lazy(() =>
  import("../Modules/CommentItem/TableComment").then(({ TableComment }) => ({
    default: TableComment,
  }))
);
const TableDocsModal = lazy(() =>
  import("../Modules/Table/Components/TableDocsModal").then(
    ({ TableDocsModal }) => ({ default: TableDocsModal })
  )
);
const ContainerStockModal = lazy(() =>
  import("../Modules/ContainerStock/Components/ContainerStockModal").then(
    ({ ContainerStockModal }) => ({ default: ContainerStockModal })
  )
);

export const AllModals = () => {
  return (
    <>
      <TableDeclStatus />
      <TableStore />
      <TableComment />
      <TableUploadModal />
      <TableFormulaDate />
      <TableItemUpdate />
      <TableDocsModal />
      <ContainerStockModal />
      <TableDateCalc />
      <TableDistanceModal />
    </>
  );
};
