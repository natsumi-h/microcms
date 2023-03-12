import React from "react";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { AppProps } from "next/dist/shared/lib/router/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
