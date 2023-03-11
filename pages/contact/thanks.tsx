import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const Thanks = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/contact");
  };

  return (
    <div className="text-center mt-10">
      <h2 className="font-bold text-xl">Thank you for your registration!</h2>
      <p className="mt-4">Check your email for more details.</p>
      <button
        onClick={onClick}
        className="mt-20 w-1/2 block mx-auto shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Go back
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referrer = context.req.headers.referer || "";

  if (!referrer.includes("/contact/confirmation")) {
    context.res.writeHead(302, { Location: "/contact" });
    context.res.end();
  }

  return { props: {} };
};

export default Thanks;
