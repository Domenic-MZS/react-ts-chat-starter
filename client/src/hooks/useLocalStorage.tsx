import {useEffect, useState} from "react";

const PREFIX = "chatappclone";

interface useLocalStorageProps {
  key: String;
  initialValue?: Function | any;
}

function useLocalStorage({ key, initialValue }: useLocalStorageProps) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") return initialValue();

    return initialValue || '';
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
