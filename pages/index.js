import React from "react";
import LatestPosts from "../components/posts/latestPosts";
import { client } from "../lib/client";
import styles from "../components/home/home.module.css"
import Aboutme from "../components/home/aboutme";

function Home(props) {
  return (
    <>
      <Aboutme></Aboutme>
      <section className={styles.section} >
        <p className={styles.p}>Latest Posts / 最近の投稿</p>
        <LatestPosts latestPosts={props} />
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const BlogList = await client.getList({
    endpoint: "blog",
  });

  return {
    props: BlogList,
  };
};

export default Home;
