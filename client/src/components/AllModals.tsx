import {
  ModalTest,
  TableComment,
  TableDeclStatus,
  TableFormulaDate,
  TableItemUpdate,
  TableStore,
  TableUploadModal,
  TableDocsModal,
} from "./index";

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
    </>
  );
};
