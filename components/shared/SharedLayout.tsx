"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

function SharedLayout({
  children,
  classNames,
}: Readonly<{
  children: React.ReactNode;
  classNames?: string;
}>) {
  const routesMatcher = ["/sign-up", "/login", "/user-type"];
  const path = usePathname();
  const isAuthPage = routesMatcher.includes(path);
  return (
    <>
      {isAuthPage ? (
        <div className={classNames}>{children}</div>
      ) : (
        <>
          <Navbar />
          <div className={classNames}>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
}

export default SharedLayout;
