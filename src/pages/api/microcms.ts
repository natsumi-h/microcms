import type { NextApiRequest, NextApiResponse } from "next";
import { MICROCMS_TOKEN } from "../../lib/client";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method === "GET") {
      const getRes = await fetch(
        "https://natsumih-blog.microcms.io/api/v1/contact",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-MICROCMS-API-KEY": `${MICROCMS_TOKEN}`,
          },
        }
      );

      if (!getRes.ok) {
        throw new Error("Failed to fetch OpenAI");
      }

      const data = await getRes.json();
      res.status(200).json(data);
    }

    if (req.method === "POST") {
      const data = req.body;

      try {
        const postRes = await fetch(
          "https://natsumih-blog.microcms.io/api/v1/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-MICROCMS-API-KEY": `${MICROCMS_TOKEN}`,
            },
            body: JSON.stringify({
              name: data.firstName,
              email: data.email,
            }),
          }
        );

        if (!postRes.ok) {
          throw new Error("Failed to fetch OpenAI");
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch OpenAI" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch OpenAI" });
  }
}
