import React from "react";
import { SearchOutlined } from "@ant-design/icons";

interface ISearchIco {
  onClick: () => void;
}

const SearchIcon: React.FC<ISearchIco> = ({ onClick }) => {
  return (
    <>
      <SearchOutlined
        onClick={() => {
          onClick();
        }}
        className="header-search"
      />
    </>
  );
};

export default SearchIcon;
