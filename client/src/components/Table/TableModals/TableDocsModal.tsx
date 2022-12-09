import React, { useEffect, useState } from "react";
import { Modal, Form } from "antd";
import { IsDocsType } from "../../../Types/Types";
import { DocsSelect } from "../../index";

interface TableDocsProps {
  opened: boolean | undefined;
  docs: IsDocsType | undefined;
  setOpen: (c: boolean) => void;
}

export const TableDocsModal: React.FC<TableDocsProps> = ({
  opened,
  docs,
  setOpen,
}) => {
  const [isDocs, setIsDocs] = useState<IsDocsType>({
    PI: null,
    CI: null,
    PL: null,
    SS_DS: null,
    contract_agrees: null,
    cost_agrees: null,
    instruction: null,
    ED: null,
    bill: null,
  });

  useEffect(() => {
    if (docs) setIsDocs(docs);
  }, [docs]);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="Документы для подачи"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" className="docs-modal">
        <DocsSelect
          label="PI"
          defaultValue={docs?.PI}
          onChange={(value) => setIsDocs({ ...isDocs, PI: value })}
        />
        <DocsSelect
          label="CI"
          defaultValue={docs?.CI}
          onChange={(value) => setIsDocs({ ...isDocs, CI: value })}
        />
        <DocsSelect
          label="PL"
          defaultValue={docs?.PL}
          onChange={(value) => setIsDocs({ ...isDocs, PL: value })}
        />
        <DocsSelect
          label="СС/ДС"
          defaultValue={docs?.SS_DS}
          onChange={(value) => setIsDocs({ ...isDocs, SS_DS: value })}
        />
        <DocsSelect
          defaultValue={docs?.contract_agrees}
          label="Контракт и действующие доп. соглашения"
          onChange={(value) => setIsDocs({ ...isDocs, contract_agrees: value })}
        />
        <DocsSelect
          defaultValue={docs?.cost_agrees}
          label="Стоимостные доп. соглашения"
          onChange={(value) => setIsDocs({ ...isDocs, cost_agrees: value })}
        />
        <DocsSelect
          defaultValue={docs?.instruction}
          label="Инструкция"
          onChange={(value) => setIsDocs({ ...isDocs, instruction: value })}
        />
        <DocsSelect
          defaultValue={docs?.ED}
          label="ED"
          onChange={(value) => setIsDocs({ ...isDocs, ED: value })}
        />
        <DocsSelect
          defaultValue={docs?.bill}
          label="Счет"
          onChange={(value) => setIsDocs({ ...isDocs, bill: value })}
        />
      </Form>
    </Modal>
  );
};
