import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteArr from "./Router";
import classNames from "classnames";
import { useFavicon, UseErrorBoundary } from "../utils";
import Layout from "./Layout";
import NavBar from "./NavBar";
import Tab from "./Tab";
import s from "./App.less";

export default function App() {
  useFavicon();

  return (
    <UseErrorBoundary>
      <BrowserRouter>
        <Layout
          navBar={<NavBar />}
          tab={<Tab />}
          content={
            <Routes>
              {Array.isArray(RouteArr) &&
                RouteArr.map((v) => (
                  <Route
                    key={v.path}
                    path={v.path}
                    element={
                      <Suspense
                        fallback={
                          <div className={classNames(s["fallback"])}>
                            努力加载中 ...
                          </div>
                        }
                      >
                        <v.component />
                      </Suspense>
                    }
                  />
                ))}
            </Routes>
          }
        />
      </BrowserRouter>
    </UseErrorBoundary>
  );
}
