import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { formAtom } from "../../state/form";
import { MICROCMS_TOKEN } from "../../lib/client";
import { GetServerSideProps } from "next";

export const Confirmation = () => {
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
      setData({
        firstName: "",
        lastName: "",
        email: "",
        emailConfirmation: "",
        newsletterRegistration: false,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3 block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
          First Name
        </div>
        <div className="md:w-2/3">{data?.firstName}</div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3 block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
          Last Name
        </div>
        <div className="md:w-2/3">{data?.lastName}</div>
      </div>
      <div className="md:flex md:items-center mt-2">
        <div className="md:w-1/3 block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
          Email
        </div>
        <div className="md:w-2/3">{data?.email}</div>
      </div>

      <div className="mt-10 flex gap-x-4 ">
        <button
          className="w-1/2 block mx-auto shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={onClickGoBack}
        >
          Go back
        </button>
        <form onSubmit={onSubmit} className="block w-1/2 ">
          <button
            className="w-full block mx-auto shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <p>{errorMessage && errorMessage}</p>
    </>
  );
};

export default Confirmation;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referrer = context.req.headers.referer || "";

  if (!referrer.includes("/contact")) {
    context.res.writeHead(302, { Location: "/contact" });
    context.res.end();
  }

  return {
    props: {},
  };
};
