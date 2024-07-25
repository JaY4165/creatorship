import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SharedLayout({
  children,
  classNames,
}: Readonly<{
  children: React.ReactNode;
  classNames?: string;
}>) {
  return (
    <>
      <Navbar />
      <div className={classNames}>{children}</div>
      <Footer />
    </>
  );
}

export default SharedLayout;
