import { ContainerStockModal } from "../Modules/ContainerStock/Components/ContainerStockModal";
import DeliveryMethodModal from "../Modules/DeliveryMethod/Components/DeliveryMethodModal";
import { TableComment } from "../Modules/Table/Components/TableComment";
import { TableDeclStatus } from "../Modules/Table/Components/TableDeclStatus";
import { TableDocsModal } from "../Modules/Table/Components/TableDocsModal";
import { TableFormulaDate } from "../Modules/Table/Components/TableFormulaDate";
import { TableItemUpdate } from "../Modules/Table/Components/TableItemUpdate/Components/TableItemUpdate";
import { TableStore } from "../Modules/Table/Components/TableStore";
import { TableUploadModal } from "../Modules/Table/Components/TableUploadModal";
import { ModalTest } from "./ModalTest";

export const AllModals = () => {
  return (
    <>
      <ModalTest />
      <TableDeclStatus />
      <TableStore />
      <TableComment />
      <TableUploadModal />
      <TableFormulaDate />
      <TableItemUpdate />
      <TableDocsModal />
      <ContainerStockModal />
      <DeliveryMethodModal />
    </>
  );
};
