import React, { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
