import {
  ModalTest,
  TableComment,
  TableDeclStatus,
  TableFormulaDate,
  TableItemUpdate,
  TableStore,
  TableUploadModal,
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
    </>
  );
};
