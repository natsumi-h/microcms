import React from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";

function Layout({ children }) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="YC63E-uvlDoWkm2EHwvAb0NPOJQ0RjkeG_iqNsL4gZ8"
        />
        <title>My blog</title>
      </Head>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
