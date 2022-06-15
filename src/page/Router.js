import { useLazy } from "../utils";

export default [
  {
    path: "/",
    component: useLazy(() => import("./view/Index")),
  },
  {
    path: "/home",
    component: useLazy(() => import("./view/HOME")),
  },
  {
    path: "/hooks",
    component: useLazy(() => import("./view/Hooks")),
  },
  {
    path: "/mobx",
    component: useLazy(() => import("./view/Mobx")),
  },
  {
    path: "*",
    component: useLazy(() => import("./view/404")),
  },
];
