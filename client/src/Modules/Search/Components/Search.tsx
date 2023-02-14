import React from "react";
import { Input } from "antd";
import SearchIcon from "../UI/SearchIcon";
import { SearchHandler, SearchInputHandler } from "../Functions/SearchHandler";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const Search = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.search.open);

  return (
    <article className="search">
      <Input
        placeholder="Поиск"
        onChange={(e) => {
          SearchInputHandler(dispatch, e.target.value);
        }}
      />
    </article>
  );
};

export default Search;
