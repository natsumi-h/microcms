import React from "react";
import LatestPosts from "../components/posts/latestPosts";
import { client } from "../lib/client";
import styles from "../components/home/home.module.css";
import Aboutme from "../components/home/aboutme";
import { GetStaticProps, NextPage } from "next";
import { Props } from "../types/blog";
import Link from "next/link";

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Aboutme></Aboutme>
      <section className={styles.section}>
        <p className={styles.p}>Latest Posts / 最近の投稿</p>
        <LatestPosts latestPosts={props} />
        <div className={styles.alignCenter}>
          <Link href="/posts">
            <a className={styles.readMore}>Read More</a>
          </Link>
        </div>
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
