import dayjs from "dayjs";
import Link from "next/link";
import styles from "./postItem.module.css";
import React, { FC } from "react";
import { Blog } from "../../types/blog";

export type PostItemProps = Blog;

export type PostItemProps2 = PostItemProps & {
  date: string;
};

export type PostItemProps3 = Omit<PostItemProps2, "publishedAt" | "thumbnail">

// export type PostItemProps = {
//   // title: string;
//   // date: string;
//   // body: string;
//   // slug: string;
//   // publishedAt: string;

// };

export const PostItem: FC<PostItemProps3> = (props) => {
  const { title, date, body, slug } = props;

  const bodyText = body.replace(/(<([^>]+)>)/gi, "");
  const bodyTextLength = bodyText.length;

  const getExcerpt = () => {
    if (bodyTextLength > 100) {
      return bodyText.substr(0, 100) + "...";
    }

    return bodyText;
  };

  const excerpt = getExcerpt();

  return (
    <li className={styles.li}>
      <Link href={`posts/${slug}`}>
        <a href={`posts/${slug}`} className={styles.a}>
          {title}
        </a>
      </Link>
      <time className={styles.time}>{dayjs(date).format("MMM DD YYYY")}</time>
      <p id="body" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
    </li>
  );
};

export default PostItem;
