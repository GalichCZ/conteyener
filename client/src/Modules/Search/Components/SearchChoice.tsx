import React, { useState } from "react";

interface IProps {
  chosen: "other" | "products";
  setChosen: (c: "other" | "products") => void;
}

const SearchChoice: React.FC<IProps> = ({ chosen, setChosen }) => {
  return (
    <div className="search-choice">
      <div
        onClick={() => {
          setChosen("other");
        }}
        className={`${
          chosen === "other" ? "search-choice_chosen" : "search-choice_unchosen"
        } choice`}
      >
        <p>Остальное</p>
      </div>
      <div
        onClick={() => {
          setChosen("products");
        }}
        className={`${
          chosen === "products"
            ? "search-choice_chosen"
            : "search-choice_unchosen"
        } choice`}
      >
        <p>Продукты</p>
      </div>
    </div>
  );
};

export default SearchChoice;
