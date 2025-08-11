import { useEffect, useState } from "react";

export const useDebounceValue = <V>(value: V, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState<V>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [delay, value])

  return debounceValue;
};
