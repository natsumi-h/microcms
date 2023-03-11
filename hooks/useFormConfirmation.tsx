import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { MICROCMS_TOKEN } from "../lib/client";
import { formAtom } from "../state/form";

export const useFormConfirmation = () => {
  const [data, setData] = useAtom(formAtom);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const onClickGoBack = () => {
    router.push("/contact");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      const postResData = await postRes.json();
      router.push("/contact/thanks");
      // setData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   emailConfirmation: "",
      //   newsletterRegistration: false,
      // });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return {
    data,
    errorMessage,
    onClickGoBack,
    onSubmit,
  };
};
