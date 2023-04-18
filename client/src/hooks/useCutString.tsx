import { useMemo } from "react";

export function useCutString() {
  const cutString = useMemo(() => {
    return (str: string, border: number): string => {
      return str && str.substring(0, border);
    };
  }, []);

  return cutString;
}
