import React, { FC } from "react";
import PostItem from "./postItem";
import styles from "./postGrid.module.css";
import { Blog } from "../../types/blog";

export type PostsGridProps = {
  posts: Blog[];
};

export const PostsGrid: FC<PostsGridProps> = (props) => {
  const { posts } = props;
  return (
    <ul className={styles.ul}>
      {posts.map((post) => (
        <PostItem
          key={post.slug}
          title={post.title}
          date={post.publishedAt}
          body={post.body}
          slug={post.slug}
        />
      ))}
    </ul>
  );
};

export default PostsGrid;
