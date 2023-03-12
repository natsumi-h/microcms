import React from "react";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { AppProps } from "next/dist/shared/lib/router/router";
import GoogleTagManager, { GtmId } from "../components/gtm/gtm";
import { gtmId } from "../lib/gtm";

function MyApp({ Component, pageProps }: AppProps) {
  console.log(gtmId);
  return (
    <>
      <GoogleTagManager gtmId={gtmId as GtmId} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
