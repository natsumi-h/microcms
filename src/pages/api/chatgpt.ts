import type { NextApiRequest, NextApiResponse } from "next";
import { OPENAPI_TOKEN } from "../../lib/openapi";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const content = req.body;
  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAPI_TOKEN}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: content }],
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("Failed to fetch OpenAI");
    }

    const data = await openaiRes.json();

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch OpenAI" });
  }
}
