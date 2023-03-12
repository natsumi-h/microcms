import React from "react";
import { client } from "../../lib/client";
// import Image from "next/image";
import styles from "../../components/posts/singlePost.module.css";
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
      <img src={thumbnail.url} alt={title} width={700} height={400} />

      <p className="mt-4 text-3xl">{title}</p>
      <time className="block mt-4 text-base">
        {dayjs(publishedAt).format("MMM DD YYYY")}
      </time>
      <div className="mt-10 text-lg">
        <div
          className="prose text-lg "
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
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
