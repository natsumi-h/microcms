import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import PostsGrid from "../../components/posts/postsGrid";
import { client } from "../../lib/client";
import { Blog } from "../../types/blog";

export type Props = MicroCMSListResponse<Blog>;

export const AllPostsPage: NextPage<Props> = (props) => {
  return (
    <>
      <section>
        <PostsGrid posts={props.contents} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const BlogList = await client.getList({
    endpoint: "blog",
  });

  return {
    props: BlogList,
    revalidate: 10,
  };
};

export default AllPostsPage;
