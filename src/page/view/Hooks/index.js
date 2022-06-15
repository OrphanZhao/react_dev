import React from "react";
import { model, ModelContext } from "./model";
import ComA from "./Components/ComA";
import ComB from "./Components/ComB";

export default function () {
  const Store = model();

  return (
    <ModelContext.Provider value={{ ...Store }}>
      <div>hooks</div>
      <ComA />
      <ComB />
    </ModelContext.Provider>
  );
}
