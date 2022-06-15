import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Result } from "antd";

let fallback = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  color: "#1890ff",
};

/**
 * 顶层捕获页面错误、防止页面白屏
 */
export default function UseErrorBoundary(props) {
  function onError(error, info) {
    /**
     * 根据错误进行灵活处理
     */
  }
  return (
    <ErrorBoundary
      onError={onError}
      fallback={
        <div style={{ ...fallback }}>
          <Result status="404" extra={<a>系统异常 ...</a>} />
        </div>
      }
    >
      {props.children}
    </ErrorBoundary>
  );
}
