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
      setCurrentOption("generationg");
      setTimeout(() => {
        setCurrentOption(nextOption.id);

        setQuestionNumber(questionNumber + 1);
        setChat([...chat, chatObj, nextQuestion]);
      }, 500);
    } else {
      const holdOnObj = { type: "question", text: "ちょっとまってね！..." };
      setCurrentOption("generating");
      setChat([...chat, chatObj]);
      setTimeout(() => {
        setChat([...chat, chatObj, holdOnObj]);
      }, 500);
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
      作品の時間の長さ：${textContent}。URL、製作年も教えてください。`;
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
        type: "question",
        text: answer,
      };

      //   chatにプッシュする;
      setChat(data && [...chat, chatObj, holdOnObj, answerObj]);
      setCurrentOption(data && "completed");
    }
  };

  const handleReset = () => {
    setChat(chatArray);
    setCurrentOption("location");
    setQuestionNumber(0);
    setAnswers([]);
  };

  if (currentOption === "completed") {
    return (
      <div className="mt-9">
        <button
          onClick={handleReset}
          className="mt-4 w-full block uppercase mx-auto shadow bg-blue-600  focus:shadow-outline focus:outline-none text-white text-s py-3 px-10 rounded font-sans"
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
            className="mt-4 w-full block uppercase mx-auto shadow bg-blue-600 focus:shadow-outline focus:outline-none text-white text-s py-3 px-10 rounded font-sans"
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
