import React from "react";
import PostItem from "./postItem";
import styles from "./postGrid.module.css";

function PostsGrid(props) {
  const { posts } = props;
  return (
    <ul className={styles.ul}>
      {posts.map((post) => (
        <PostItem
          key={post.slug}
          post={post}
          title={post.title}
          date={post.publishedAt}
          body={post.body}
          slug={post.slug}
        />
      ))}
    </ul>
  );
}

export default PostsGrid;
