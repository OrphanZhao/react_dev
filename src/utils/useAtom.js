import { useState } from "react";
/**
 *
 * @param {object} initialState
 * @returns
 */
export default function useAtom(initialState = {}) {
  const [state, setState] = useState({ ...initialState });
  const changeState = (v = {}) =>
    setState((pre) => ({
      ...pre,
      ...v,
    }));
  let hook = [state, changeState];
  Object.defineProperties(hook, {
    state: {
      value: state,
      configurable: false,
      enumerable: false,
      writable: true,
    },
    changeState: {
      value: changeState,
      configurable: false,
      enumerable: false,
      writable: false,
    },
  });
  return hook;
}
