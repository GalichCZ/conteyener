import React, { useContext, useEffect, useState } from "react";
import { Modal, Form } from "antd";
import { IsDocsType } from "../../../Types/Types";
import ReDrawContext from "../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import {
  setDocsId,
  setOpenDocs,
  setDocs,
} from "../../../store/slices/tableDocsSlice";
import { DocsSelect } from "../../../components";
import { updateDocs } from "../Functions/itemFuncs";
import AuthContext from "@/store/auth-context";

export const TableDocsModal: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const reDraw = useContext(ReDrawContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [err, setErr] = useState<string | null>();
  const [isDocs, setIsDocs] = useState<IsDocsType>({
    PI: false,
    CI: false,
    PL: false,
    SS_DS: false,
    contract_agrees: false,
    cost_agrees: false,
    instruction: false,
    ED: false,
    bill: false,
    order_number: "",
  });

  const open = useAppSelector((state) => state.tableDocs.open);
  const _id = useAppSelector((state) => state.tableDocs._id);
  const docs = useAppSelector((state) => state.tableDocs.docs);

  useEffect(() => {
    if (docs) setIsDocs(docs);
  }, [docs]);
  const authCtx = useContext(AuthContext);

  const handleOk = async () => {
    setConfirmLoading(true);
    reDraw.reDrawHandler(true);
    const response = await updateDocs(_id, isDocs);
    if (response.error) setErr(response.error);
    if (response.success) {
      setConfirmLoading(false);
      dispatch(setOpenDocs());
      dispatch(setDocsId(""));
      resetInput();
      reDraw.reDrawHandler(false);
    }
  };

  const handleCancel = () => {
    dispatch(setOpenDocs());
    dispatch(setDocsId(""));
    resetInput();
  };

  function resetInput() {
    dispatch(
      setDocs({
        PI: false,
        CI: false,
        PL: false,
        SS_DS: false,
        contract_agrees: false,
        cost_agrees: false,
        instruction: false,
        ED: false,
        bill: false,
        order_number: "",
      })
    );
  }

  const isAdmin = authCtx.role === "manager_int";

  return (
    <Modal
      title="Документы для подачи"
      open={open}
      onOk={async () => {
        await handleOk();
      }}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <b>Номер заказа: {isDocs?.order_number}</b>
      <Form layout="vertical" className="docs-modal">
        <DocsSelect
          disabled={!isAdmin}
          label="PI"
          checked={isDocs?.PI}
          onChange={(e) => {
            setIsDocs({ ...isDocs, PI: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          label="CI"
          checked={isDocs?.CI}
          onChange={(e) => {
            setIsDocs({ ...isDocs, CI: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          label="PL"
          checked={isDocs?.PL}
          onChange={(e) => {
            setIsDocs({ ...isDocs, PL: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          label="СС/ДС"
          checked={isDocs?.SS_DS}
          onChange={(e) => {
            setIsDocs({ ...isDocs, SS_DS: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          checked={isDocs?.contract_agrees}
          label="Контракт и действующие доп. соглашения"
          onChange={(e) => {
            setIsDocs({ ...isDocs, contract_agrees: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          checked={isDocs?.cost_agrees}
          label="Стоимостные доп. соглашения"
          onChange={(e) => {
            setIsDocs({ ...isDocs, cost_agrees: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          checked={isDocs?.instruction}
          label="Инструкция"
          onChange={(e) => {
            setIsDocs({ ...isDocs, instruction: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          checked={isDocs?.ED}
          label="ED"
          onChange={(e) => {
            setIsDocs({ ...isDocs, ED: e.valueOf() });
          }}
        />
        <DocsSelect
          disabled={!isAdmin}
          checked={isDocs?.bill}
          label="Счет"
          onChange={(e) => {
            setIsDocs({ ...isDocs, bill: e.valueOf() });
          }}
        />
      </Form>
    </Modal>
  );
};
