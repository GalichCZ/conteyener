import { useMemo } from "react";

const useColorText = (value: string | undefined, searchValue: string) => {
  if (value?.includes(searchValue) && searchValue !== "") {
    return {
      background: "rgba(255, 255, 0, 0.308)",
    };
  } else {
    return {};
  }
};

export default useColorText;
