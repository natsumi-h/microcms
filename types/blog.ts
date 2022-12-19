import { MicroCMSListResponse } from "microcms-js-sdk";

export type Props = MicroCMSListResponse<Blog>;

export type Blog = {
  title: string;
  // date: string;
  body: string;
  slug: string;
  publishedAt: string;
  thumbnail: { url: string };
};
