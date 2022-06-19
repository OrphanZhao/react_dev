import { message } from "antd";
/**
 *
 * @param {function} request
 * @returns
 */
export default async function useQuery(
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
          console.log(res);
          res && message.error(res.message);
          rejected(res);
        }
      })
      .catch((err) => {
        message.error("请求失败");
        rejected(err);
      });
  });
}
