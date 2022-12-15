import React, { useEffect, useState } from "react";
import { Modal, Form } from "antd";
import { IsDocsType } from "../../../Types/Types";
import { DocsSelect } from "../../index";
import Docs from "../../../functions/isDocsFuncs";

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
      window.location.reload();
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
          defaultValue={docs?.PI}
          onChange={(value) =>
            setIsDocs({ ...isDocs, PI: value === "+" ? true : false })
          }
        />
        <DocsSelect
          label="CI"
          defaultValue={docs?.CI}
          onChange={(value) =>
            setIsDocs({ ...isDocs, CI: value === "+" ? true : false })
          }
        />
        <DocsSelect
          label="PL"
          defaultValue={docs?.PL}
          onChange={(value) =>
            setIsDocs({ ...isDocs, PL: value === "+" ? true : false })
          }
        />
        <DocsSelect
          label="СС/ДС"
          defaultValue={docs?.SS_DS}
          onChange={(value) =>
            setIsDocs({ ...isDocs, SS_DS: value === "+" ? true : false })
          }
        />
        <DocsSelect
          defaultValue={docs?.contract_agrees}
          label="Контракт и действующие доп. соглашения"
          onChange={(value) =>
            setIsDocs({
              ...isDocs,
              contract_agrees: value === "+" ? true : false,
            })
          }
        />
        <DocsSelect
          defaultValue={docs?.cost_agrees}
          label="Стоимостные доп. соглашения"
          onChange={(value) =>
            setIsDocs({ ...isDocs, cost_agrees: value === "+" ? true : false })
          }
        />
        <DocsSelect
          defaultValue={docs?.instruction}
          label="Инструкция"
          onChange={(value) =>
            setIsDocs({ ...isDocs, instruction: value === "+" ? true : false })
          }
        />
        <DocsSelect
          defaultValue={docs?.ED}
          label="ED"
          onChange={(value) =>
            setIsDocs({ ...isDocs, ED: value === "+" ? true : false })
          }
        />
        <DocsSelect
          defaultValue={docs?.bill}
          label="Счет"
          onChange={(value) =>
            setIsDocs({ ...isDocs, bill: value === "+" ? true : false })
          }
        />
      </Form>
    </Modal>
  );
};
