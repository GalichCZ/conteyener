import { useGetKeyValuesQuery } from "@/store/api/itemFiltersApi";
import { useEffect, useState } from "react";

export const useGetItemFilters = (key_name: string, isHidden: boolean) => {
  const { data, error, isLoading } = useGetKeyValuesQuery({
    key_name,
    isHidden,
  });
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (data) {
      setValues(data.values);
    }
  }, [data]);

  return { values, error, isLoading };
};
