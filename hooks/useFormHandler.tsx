import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MICROCMS_TOKEN } from "../lib/client";
import { formAtom } from "../state/form";

export const useFormHandler = () => {
  const [data, setData] = useAtom(formAtom);
  const [errorMessage, setErrorMessage] = useState<null | string>();
  const router = useRouter();
  type GetResData = {
    email: string;
  };

  type Form = z.infer<typeof schema>;

  const schema = z
    .object({
      firstName: z.string().min(1, "First Name is required."),
      lastName: z.string().min(1, "Last Name is required."),
      email: z.string().email("Please enter proper email."),
      emailConfirmation: z.string().email("Please enter proper email."),
      newsletterRegistration: z.boolean(),
    })
    .refine((data) => data.email === data.emailConfirmation, {
      message: "Emails do not match.",
      path: ["emailConfirmation"],
    })
    .refine((data) => data.newsletterRegistration, {
      message: "Newsletter registration is neccessary.",
      path: ["newsletterRegistration"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      emailConfirmation: data.emailConfirmation,
      newsletterRegistration: data.newsletterRegistration,
    },
  });

  const onSubmit = async (data: Form) => {
    setErrorMessage(null);
    try {
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
      const getResData = await getRes.json();
      const ifDuplicateEmail = await getResData.contents.some(
        (element: GetResData) => element.email === data.email
      );
      if (ifDuplicateEmail) {
        throw Error(
          "This email has already been used to register for the campaign. Please use a different email."
        );
      } else {
        router.push("contact/confirmation");
        const {
          email,
          firstName,
          lastName,
          emailConfirmation,
          newsletterRegistration,
        } = data;
        setData({
          email,
          firstName,
          lastName,
          emailConfirmation,
          newsletterRegistration,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    }
  };

  return {
    onSubmit,
    errorMessage,
    register,
    handleSubmit,
    errors,
    isValid,
  };
};
