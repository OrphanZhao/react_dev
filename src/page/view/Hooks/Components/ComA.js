import React, { useContext, useEffect } from "react";
import { ModelContext } from "../model";

export default function () {
  const { list = [], getList } = useContext(ModelContext);

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      {Array.isArray(list) &&
        list.map((v) => (
          <div key={`${v.name - v.age}`}>
            <span>{v.name}：</span>
            <span>{v.age}</span>
          </div>
        ))}
    </div>
  );
}
