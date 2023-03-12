// import React, { FunctionComponent } from "react";
// import { Blog, Props } from "../../pages";
import React, { FC } from "react";
import { Blog } from "../../types/blog";
import PorstsGrid from "./postsGrid";

export type LatestPostsProps = {
  latestPosts: {
    // オブジェクトの、配列
    // contents: {
    //   title: string;
    //   date: string;
    //   body: string;
    //   slug:string;
    //   publishedAt:string;

    // }[];
    contents: Blog[];
  };
};

export const LatestPosts: FC<LatestPostsProps> = (props) => {
  const { latestPosts } = props;

  const posts = latestPosts.contents.filter((item, index) => index <= 2);
  return <PorstsGrid posts={posts}></PorstsGrid>;
};

export default LatestPosts;
