import { useState } from "react";
import { message } from "antd";

/**
 *
 * @param {function} request
 * @returns
 */
async function useQuery(
  request = () => {
    return new Promise((resolve) => resolve({}));
  }
) {
  return new Promise((resolve, rejected) => {
    request()
      .then(({ data: res }) => {
        if (res && (res.code === 0 || res.code === 200)) {
          resolve(res);
        } else {
          res && message.error(res.msg);
          rejected(res);
        }
      })
      .catch((err) => {
        message.error("请求失败");
        rejected(err);
      });
  });
}
/**
 *
 * @param {object} initialState
 * @returns
 */
function useAtom(initialState = {}) {
  const [state, setState] = useState({ ...initialState });
  const changeState = (v = {}) =>
    setState((pre) => ({
      ...pre,
      ...v,
    }));
  return [state, changeState];
}

export { useAtom, useQuery };
