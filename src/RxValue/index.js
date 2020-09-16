import { useEffect, useState } from "react";

export function useRx(observable) {
  const [state, setState] = useState(null);
  useEffect(() => {
    if (observable && observable.subscribe) {
      const subscriber = observable.subscribe((date) => setState(date));
      console.log(subscriber);
      return () => subscriber.unsubscribe();
    }
  }, [observable]);
  return state;
}

export function useComputedValue(item, cb) {
  const [value, setExternal] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setExternal(cb(item)), [item]);
  return value;
}

export default function RxValue({ children }) {
  return useRx(children);
}
