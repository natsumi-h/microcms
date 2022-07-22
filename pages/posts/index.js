import React from "react";
import PostsGrid from "../../components/posts/postsGrid";
import { client } from "../../lib/client";

function AllPostsPage(props) {
  return (
    <>
      <section>
        <PostsGrid posts={props.contents} />
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
    revalidate: 10,
  };
};

export default AllPostsPage;
