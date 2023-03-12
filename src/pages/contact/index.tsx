import { useFormHandler } from "../../hooks/useFormHandler";

export const Contact = () => {
  const { onSubmit, errorMessage, register, handleSubmit, errors, isValid } =
    useFormHandler();

  return (
    <>
      <h1 className="font-bold text-2xl text-center">Mock Form</h1>
      <form className="w-full mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-first-name"
            >
              First Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-first-name"
              type="text"
              placeholder="Jane"
              {...register("firstName")}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <span className="md:w-1/3"></span>
          <p className="md:w-2/3 text-sm text-red-400 mt-2">
            {errors.firstName?.message}
          </p>
        </div>

        <div className="md:flex md:items-center mt-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-last-name"
            >
              Last Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-last-name"
              type="text"
              placeholder="Doe"
              {...register("lastName")}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <span className="md:w-1/3"></span>
          <p className="md:w-2/3 text-sm text-red-400 mt-2">
            {errors.lastName?.message}
          </p>
        </div>

        <div className="md:flex md:items-center mt-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              type="text"
              placeholder="test@test.com"
              {...register("email")}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <span className="md:w-1/3"></span>
          <p className="md:w-2/3 text-sm text-red-400 mt-2">
            {errors.email?.message}
          </p>
        </div>

        <div className="md:flex md:items-center mt-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-emailConfirmation"
            >
              Email<br></br>(Confirmation)
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-emailConfirmation"
              type="text"
              placeholder="test@test.com"
              {...register("emailConfirmation")}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <span className="md:w-1/3"></span>
          <p className="md:w-2/3 text-sm text-red-400 mt-2">
            {errors.emailConfirmation?.message}
          </p>
        </div>

        <div className="md:flex items-center mt-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              {...register("newsletterRegistration")}
            />
            <span className="text-sm">Send me your newsletter!</span>
            <p className="text-sm text-red-400 mt-2 font-normal">
              {errors.newsletterRegistration?.message}
            </p>
          </label>
        </div>

        <div className="md:flex md:items-center mt-6">
          {/* <div className="md:w-1/3"></div>
        <div className="md:w-2/3"> */}
          <button
            className={`w-full md:w-3/4 block mx-auto shadow ${
              !isValid ? "bg-purple-400" : "bg-purple-500"
            } hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
            type="submit"
            // disabled={!isValid}
          >
            Submit
          </button>

          {/* </div> */}
        </div>
        <p className="w-full md:w-3/4 block mx-auto text-red-400 mt-4 text-sm">
          {errorMessage && errorMessage}
        </p>
      </form>
    </>
  );
};

export default Contact;
