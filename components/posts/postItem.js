import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import styles from "./postItem.module.css";

function PostItem(props) {
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
}

export default PostItem;
