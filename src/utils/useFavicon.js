import { useLayoutEffect } from "react";
import favicon from "@@/public/images/favicon-32x32.png";
/**
 * 添加 `favicon` 图标
 */
export default function useFavicon() {
  useLayoutEffect(
    () =>
      (function () {
        // 文档碎片一次性插入
        let link = document.createElement("link");
        link.type = "image/png";
        link.rel = "icon";
        link.sizes = "32x32";
        link.href = favicon;
        document.getElementsByTagName("head")[0].appendChild(link);
      })(),
    []
  );
}
