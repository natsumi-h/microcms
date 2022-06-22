import React from "react";
import PorstsGrid from "./postsGrid";

function LatestPosts(props) {
  const { latestPosts } = props;

  const posts = latestPosts.contents.filter((item, index) => index <= 2);

  return <PorstsGrid posts={posts}></PorstsGrid>;
}

export default LatestPosts;
