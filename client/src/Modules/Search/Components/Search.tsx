import { useEffect, useState } from "react";
import { Input } from "antd";
import {
  SearchInputHandler,
  SearchFilterHandler,
} from "../Functions/SearchHandler";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import SearchChoice from "./SearchChoice";
import { UpOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.search.open);
  const [chosen, setChosen] = useState<"other" | "products">("other");
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    SearchFilterHandler(dispatch, chosen);
  }, [chosen]);

  return (
    <article className="search">
      <Input
        placeholder="Поиск"
        onChange={(e) => {
          SearchInputHandler(dispatch, e.target.value);
        }}
      />
      <UpOutlined
        onClick={() => {
          setFocus(!focus);
        }}
        className="search-arrow"
        style={{
          transform: focus ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
      {focus && <SearchChoice chosen={chosen} setChosen={setChosen} />}
    </article>
  );
};

export default Search;
