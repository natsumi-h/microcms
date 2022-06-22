import React from "react";
import { client } from "../../lib/client";
import Image from "next/image";
import styles from "../../components/posts/single.module.css";
import dayjs from "dayjs";

function postDetailPage(props) {
  const { title, publishedAt, body, thumbnail } = props;

  return (
    <>
    
 
    <Image
        src={thumbnail.url}
        alt={title}
        width={600}
        height={400}
        objectFit="contain"
      />

   
      <p className={styles.title}>{title}</p>
      <time className={styles.time} >{dayjs(publishedAt).format("MMM DD YYYY")}</time>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </>
  );
}

export const getStaticPaths = async () => {
  const BlogList = await client.getList({ endpoint: "blog" });
  const slugs = BlogList.contents.map((content) => `/posts/${content.slug}`);

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const BlogList = await client.getList({ endpoint: "blog" });
  const currentSlug = ctx.params.slug;
  const contents = BlogList.contents;
  const result = contents.find((v) => v.slug === currentSlug);
  const currentId = result.id;
  const BlogListDetail = await client.getListDetail({
    endpoint: "blog",
    contentId: currentId,
  });

  return {
    props: BlogListDetail,
  };
};

export default postDetailPage;
