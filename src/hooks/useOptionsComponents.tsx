import { useAtom } from "jotai";
import { MouseEventHandler, useState } from "react";
import { chatArray } from "../components/netflix/chatArray";
import { optionArray } from "../components/netflix/optionArray";
import { questionArray } from "../components/netflix/questionArray";
import { OPENAPI_TOKEN } from "../lib/openapi";
import { chatAtom, currenOptionAtom } from "../state/chat";

export const useOptionsComponent = () => {
  type AnswerType = {
    type: string;
    answer: string;
  }[];

  const [chat, setChat] = useAtom(chatAtom);
  const [currentOption, setCurrentOption] = useAtom(currenOptionAtom);

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

  const handleReset = () => {
    setChat(chatArray);
    setCurrentOption("location");
    setQuestionNumber(0);
    setAnswers([]);
    setTextArea("");
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
  return {
    currentOption,
    currentOptionObj,
    textArea,
    handleReset,
    handleOnClick,
    handleSubmit,
    handleTextAreaOnchange,
  };
};
