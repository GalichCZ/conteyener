import React from "react";

interface IProps {
  dataToFiltr: any[] | undefined;
}

export const FilterList: React.FC<IProps> = ({ dataToFiltr }) => {
  return <div className="filter-list">FilterList</div>;
};
