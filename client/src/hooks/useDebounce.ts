import { useRef, useCallback } from "react";

function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debounceCallback = useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounceCallback;
}

export default useDebounce;
