"use client";

import { Provider } from "react-redux";

import store from "@/utils/react-redux";

export default function ReactReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
