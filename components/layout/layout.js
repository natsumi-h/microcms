import React from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>My blog</title>
      </Head>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
