import React, { FC } from "react";
import { useOptionsComponent } from "../../hooks/useOptionsComponents";

export const OptionsComponent: FC = () => {
  const {
    currentOption,
    currentOptionObj,
    textArea,
    handleReset,
    handleOnClick,
    handleSubmit,
    handleTextAreaOnchange,
  } = useOptionsComponent();

  if (currentOption === "specialRequest") {
    return (
      <div className="px-4 pt-4 mb-2 sm:mb-0">
        <form className="relative " onSubmit={handleSubmit}>
          <textarea
            placeholder="できればここ2〜3年の作品が良いです。愛の不時着はもう観たのでそれ以外でお願いします。"
            className="w-full h-40 focus:outline-none focus:placeholder-gray-400 text-black placeholder-gray-600 px-4 bg-gray-100 rounded-md py-3"
            onChange={handleTextAreaOnchange}
            value={textArea}
          />
          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
          >
            <span>送信する</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
      </div>
    );
  }
  if (currentOption === "completed") {
    return (
      <div className="mt-9">
        <button
          onClick={handleReset}
          className="mt-4 w-3/4 block uppercase mx-auto shadow  bg-blue-500 hover:bg-blue-400 focus:outline-none focus:shadow-outline text-white text-s py-3 px-10 rounded font-sans"
        >
          もう一度ためす！
        </button>
      </div>
    );
  }
  if (currentOptionObj) {
    return (
      <div className="mt-9">
        {currentOptionObj?.options.map((option) => (
          <button
            onClick={handleOnClick}
            key={option.id}
            className="mt-4 w-3/4 block uppercase mx-auto shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white text-s py-3 px-10 rounded font-sans"
          >
            {option.option}
          </button>
        ))}
      </div>
    );
  }
  return null;
};

export default OptionsComponent;
