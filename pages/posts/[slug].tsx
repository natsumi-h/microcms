import React from "react";
import { client } from "../../lib/client";
// import Image from "next/image";
import styles from "../../components/posts/single.module.css";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Blog, Props } from "../../types/blog";

export const postDetailPage: NextPage<Blog> = (props) => {
  const { title, publishedAt, body, thumbnail } = props;

  return (
    <>
      {/* <Image
        src={thumbnail.url}
        alt={title}
        width={600}
        height={400}
        objectFit="contain"
      /> */}
      <img
        src={thumbnail.url}
        alt={title}
        width={600}
        height={400}
      />

      <p className={styles.title}>{title}</p>
      <time className={styles.time}>
        {dayjs(publishedAt).format("MMM DD YYYY")}
      </time>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const BlogList = await client.getList({ endpoint: "blog" });
  const slugs = BlogList.contents.map((content) => `/posts/${content.slug}`);

  console.log(slugs);
  return {
    paths: slugs,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const BlogList = await client.getList({ endpoint: "blog" });
  const currentSlug = ctx.params && ctx.params.slug;
  const contents = BlogList.contents;
  const result = contents.find((v) => v.slug === currentSlug);
  const currentId = result.id;
  const BlogListDetail = await client.getListDetail({
    endpoint: "blog",
    contentId: currentId,
  });

  return {
    props: BlogListDetail,
    revalidate: 10,
  };
};

export default postDetailPage;
