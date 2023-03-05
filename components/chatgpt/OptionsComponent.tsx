import React, { FC, useState, MouseEventHandler } from "react";
import { chatArray, ChatType } from "./chatArray";
import { optionArray } from "./optionArray";
import { questionArray } from "./questionArray";
import { Props } from "./Chat";
import { OPENAPI_TOKEN } from "../../lib/openapi";

type AnswerType = {
  type: string;
  answer: string;
}[];

export const OptionsComponent: FC<Props> = (props) => {
  const { currentOption, setCurrentOption, chat, setChat } = props.props;
  const currentOptionObj = optionArray.find((obj) => obj.id === currentOption);
  const currentIndex = optionArray.findIndex((obj) => obj.id === currentOption);
  const nextOption = optionArray[currentIndex + 1];
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerType | undefined>(undefined);
  const [textArea, setTextArea] = useState<string>("");

  const nextQuestion = {
    type: "question",
    text: questionArray[questionNumber + 1],
  };

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const textContent = (event.target as HTMLElement).textContent || "";
    const chatObj = {
      type: "answer",
      text: textContent,
    };
    //   回答を保存する
    setAnswers(
      answers !== undefined && textContent
        ? [...answers, { type: currentOption, answer: textContent }]
        : [{ type: currentOption, answer: textContent }]
    );

    if (nextOption) {
      // chatにプッシュする
      setChat([...chat, chatObj]);
      setCurrentOption("generating");
      setTimeout(() => {
        setCurrentOption(nextOption.id);

        setQuestionNumber(questionNumber + 1);
        setChat([...chat, chatObj, nextQuestion]);
      }, 200);
    } // 次の選択肢はないが、スペシャルリクエストに行くとき
    else {
      setChat([...chat, chatObj]);
      setQuestionNumber(questionNumber + 1);
      setTimeout(() => {
        setCurrentOption("specialRequest");
        setChat([...chat, chatObj, nextQuestion]);
      }, 200);
    }
  };

  const handleReset = () => {
    setChat(chatArray);
    setCurrentOption("location");
    setQuestionNumber(0);
    setAnswers([]);
    setTextArea("");
  };

  const handleTextAreaOnchange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextArea(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chatObj = {
      type: "answer",
      text: textArea ? textArea : "とくになし",
    };

    //   回答を保存する
    setAnswers(
      answers !== undefined && textArea
        ? [...answers, { type: currentOption, answer: textArea }]
        : [{ type: currentOption, answer: textArea }]
    );

    const holdOnObj = { type: "question", text: "ちょっとまってね！..." };
    setCurrentOption("generating");
    setChat([...chat, chatObj]);
    setTimeout(() => {
      setChat([...chat, chatObj, holdOnObj]);
    }, 200);
    event.preventDefault();

    const content =
      answers &&
      `今晩みるべきおすすめのネットフリックスコンテンツを教えてください。条件は以下のようなかたちです。
     視聴可能な国：${answers[0] ? answers[0].answer : "日本"}、ジャンル：${
        answers[1] ? answers[1].answer : "なんでも"
      }、
      制作国：${
        answers[2]
          ? answers[2].answer === "その他の国"
            ? "日本、アメリカ、韓国を除く国"
            : answers[2].answer
          : "どこでも"
      }、
      今の気分：${answers[3] ? answers[3].answer : "なんでも"}、
      作品の時間の長さ：${answers[4] ? answers[4].answer : "なんでも"}、
      その他のリクエスト：${textArea ? textArea : "特にありません"}
      URL、製作年も教えてください。`;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAPI_TOKEN}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: content }],
      }),
    });

    const data = await res.json();
    const answer = data && data.choices[0].message.content;
    const answerObj = answer && {
      type: "output",
      text: answer,
    };

    //   chatにプッシュする;
    setChat(data && [...chat, chatObj, holdOnObj, answerObj]);
    setCurrentOption(data && "completed");
  };

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
