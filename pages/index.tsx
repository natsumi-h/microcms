import React from "react";
import LatestPosts from "../components/posts/latestPosts";
import { client } from "../lib/client";
import styles from "../components/home/home.module.css";
import Aboutme from "../components/home/aboutme";
import { GetStaticProps, NextPage } from "next";
import { Props } from "../types/blog";
// import { MicroCMSListResponse } from "microcms-js-sdk";
// import { Blog, Props } from "../types/blog";

// export type Blog = {
//   title: string;
//   date: string;
//   body: string;
//   slug:string;
//   publishedAt:string;
// };

// export type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  console.log(props);
  return (
    <>
      <Aboutme></Aboutme>
      <section className={styles.section}>
        <p className={styles.p}>Latest Posts / 最近の投稿</p>
        <LatestPosts latestPosts={props} />
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const BlogList = await client.getList({
    endpoint: "blog",
  });
  
  return {
    props: BlogList,
    revalidate: 1,
  };
};

export default Home;
