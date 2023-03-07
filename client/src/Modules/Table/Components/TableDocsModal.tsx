import React, { useContext, useEffect, useState } from "react";
import { Modal, Form } from "antd";
import { IsDocsType } from "../../../Types/Types";
import ReDrawContext from "../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setDocsId, setOpenDocs } from "../../../store/slices/tableDocsSlice";
import { DocsSelect } from "../../../components";
import Docs from "../Functions/isDocsFuncs";

const DocsFuncs = new Docs();

export const TableDocsModal: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const reDraw = useContext(ReDrawContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [err, setErr] = useState<string | null>();
  const [isDocs, setIsDocs] = useState({});

  const open = useAppSelector((state) => state.tableDocs.open);
  const _id = useAppSelector((state) => state.tableDocs._id);
  const docs = useAppSelector((state) => state.tableDocs.docs);

  useEffect(() => {
    if (docs) setIsDocs(docs);
  }, [docs]);

  const handleOk = async () => {
    setConfirmLoading(true);
    reDraw.reDrawHandler(true);
    const response = await DocsFuncs.updateDocs(isDocs, _id);
    if (response.error) setErr(response.error);
    if (response === 200) {
      setConfirmLoading(false);
      dispatch(setOpenDocs());
      dispatch(setDocsId(""));
      reDraw.reDrawHandler(false);
    }
  };

  const handleCancel = () => {
    dispatch(setOpenDocs());
    dispatch(setDocsId(""));
  };

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
      <Form layout="vertical" className="docs-modal">
        <DocsSelect
          label="PI"
          value={docs?.PI}
          onChange={(value) =>
            setIsDocs({ ...isDocs, PI: value === "+" ? true : false })
          }
        />
        <DocsSelect
          label="CI"
          value={docs?.CI}
          onChange={(value) =>
            setIsDocs({ ...isDocs, CI: value === "+" ? true : false })
          }
        />
        <DocsSelect
          label="PL"
          value={docs?.PL}
          onChange={(value) =>
            setIsDocs({ ...isDocs, PL: value === "+" ? true : false })
          }
        />
        <DocsSelect
          label="СС/ДС"
          value={docs?.SS_DS}
          onChange={(value) =>
            setIsDocs({ ...isDocs, SS_DS: value === "+" ? true : false })
          }
        />
        <DocsSelect
          value={docs?.contract_agrees}
          label="Контракт и действующие доп. соглашения"
          onChange={(value) =>
            setIsDocs({
              ...isDocs,
              contract_agrees: value === "+" ? true : false,
            })
          }
        />
        <DocsSelect
          value={docs?.cost_agrees}
          label="Стоимостные доп. соглашения"
          onChange={(value) =>
            setIsDocs({ ...isDocs, cost_agrees: value === "+" ? true : false })
          }
        />
        <DocsSelect
          value={docs?.instruction}
          label="Инструкция"
          onChange={(value) =>
            setIsDocs({ ...isDocs, instruction: value === "+" ? true : false })
          }
        />
        <DocsSelect
          value={docs?.ED}
          label="ED"
          onChange={(value) =>
            setIsDocs({ ...isDocs, ED: value === "+" ? true : false })
          }
        />
        <DocsSelect
          value={docs?.bill}
          label="Счет"
          onChange={(value) =>
            setIsDocs({ ...isDocs, bill: value === "+" ? true : false })
          }
        />
      </Form>
    </Modal>
  );
};
