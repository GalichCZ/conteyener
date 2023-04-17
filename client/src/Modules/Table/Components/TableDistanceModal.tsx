import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, InputNumber } from "antd";
import { MyInput } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import ReDrawContext from "../../../store/redraw-context";
import { setOpenDistance } from "../../../store/slices/tableDistanceSlice";
import { updateItemDistance } from "../Functions/itemFuncs";

export const TableDistanceModal = () => {
  const reDraw = useContext(ReDrawContext);
  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.tableDistance.open);
  const distance = useAppSelector((state) => state.tableDistance.distance);
  const _id = useAppSelector((state) => state.tableDistance._id);

  const [km, setKm] = useState<{ km_to_dist: number | null; _id: string }>({
    km_to_dist: 0,
    _id: "",
  });

  const handleOk = () => {
    dispatch(setOpenDistance());
    updateDistanceHandler();
  };

  const handleCancel = () => {
    dispatch(setOpenDistance());
  };

  const updateDistanceHandler = async () => {
    reDraw.reDrawHandler(true);
    const result = km && (await updateItemDistance(km));
    result && reDraw.reDrawHandler(false);
  };

  useEffect(() => {
    open && setKm({ ...km, km_to_dist: distance, _id });
  }, [open]);
  return (
    <Modal onOk={handleOk} onCancel={handleCancel} open={open}>
      <Form>
        <Form.Item label="Км. до станции назначения">
          <InputNumber
            name="km"
            value={km.km_to_dist}
            min={0}
            onChange={(value) => setKm({ ...km, km_to_dist: value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
