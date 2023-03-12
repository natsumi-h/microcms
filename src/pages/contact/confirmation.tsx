import { GetServerSideProps } from "next";
import { useFormConfirmation } from "../../hooks/useFormConfirmation";

export const Confirmation = () => {
  const { data, onClickGoBack, onSubmit, errorMessage } = useFormConfirmation();

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
