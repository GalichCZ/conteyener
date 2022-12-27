import React, { useContext, useEffect, useState } from "react";
import { Modal, Form } from "antd";
import { IsDocsType } from "../../../Types/Types";
import { DocsSelect } from "../../index";
import Docs from "../../../functions/isDocsFuncs";
import ReDrawContext from "../../../store/redraw-context";

interface TableDocsProps {
  opened: boolean | undefined;
  docs: IsDocsType | undefined;
  setOpen: (c: boolean) => void;
  _id: string;
}

const DocsFuncs = new Docs();

export const TableDocsModal: React.FC<TableDocsProps> = ({
  opened,
  docs,
  setOpen,
  _id,
}) => {
  const reDraw = useContext(ReDrawContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [err, setErr] = useState<string | null>();
  const [isDocs, setIsDocs] = useState({});

  useEffect(() => {
    if (docs) setIsDocs(docs);
  }, [docs]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await DocsFuncs.updateDocs(isDocs, _id);
    if (response.error) setErr(response.error);
    if (response === 200) {
      setConfirmLoading(false);
      setOpen(false);
      reDraw.reDrawHandler(true);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Документы для подачи"
      open={opened}
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
