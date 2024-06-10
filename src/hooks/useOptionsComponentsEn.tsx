import { useAtom } from "jotai";
import { MouseEventHandler, useState } from "react";
import { OPENAPI_TOKEN } from "../lib/openapi";
import { chatAtomEn, currenOptionAtomEn } from "../state/chat";
import { optionArrayEn } from "../components/netflix/en/optionArrayEn";
import { chatArrayEn } from "../components/netflix/en/chatArrayEn";
import { questionArrayEn } from "../components/netflix/en/questionArrayEn";

export const useOptionsComponentEn = () => {
  type AnswerType = {
    type: string;
    answer: string;
  }[];

  const [chatEn, setChatEn] = useAtom(chatAtomEn);
  const [currentOptionEn, setcurrentOptionEn] = useAtom(currenOptionAtomEn);

  const currentOptionObjEn = optionArrayEn.find(
    (obj) => obj.id === currentOptionEn
  );
  const currentIndex = optionArrayEn.findIndex(
    (obj) => obj.id === currentOptionEn
  );
  const nextOption = optionArrayEn[currentIndex + 1];

  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerType | undefined>(undefined);
  const [textArea, setTextArea] = useState<string>("");
  const nextQuestion = {
    type: "question",
    text: questionArrayEn[questionNumber + 1],
  };

  const handleReset = () => {
    setChatEn(chatArrayEn);
    setcurrentOptionEn("location");
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
        ? [...answers, { type: currentOptionEn, answer: textContent }]
        : [{ type: currentOptionEn, answer: textContent }]
    );

    if (nextOption) {
      // chatにプッシュする
      setChatEn([...chatEn, chatObj]);
      setcurrentOptionEn("generating");
      setTimeout(() => {
        setcurrentOptionEn(nextOption.id);

        setQuestionNumber(questionNumber + 1);
        setChatEn([...chatEn, chatObj, nextQuestion]);
      }, 200);
    } // 次の選択肢はないが、スペシャルリクエストに行くとき
    else {
      setChatEn([...chatEn, chatObj]);
      setQuestionNumber(questionNumber + 1);
      setTimeout(() => {
        setcurrentOptionEn("specialRequest");
        setChatEn([...chatEn, chatObj, nextQuestion]);
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
      text: textArea ? textArea : "Not any",
    };

    //   回答を保存する
    setAnswers(
      answers !== undefined && textArea
        ? [...answers, { type: currentOptionEn, answer: textArea }]
        : [{ type: currentOptionEn, answer: textArea }]
    );

    const holdOnObj = { type: "question", text: "Hold on a sec...!" };
    setcurrentOptionEn("generating");
    setChatEn([...chatEn, chatObj]);
    setTimeout(() => {
      setChatEn([...chatEn, chatObj, holdOnObj]);
    }, 200);
    event.preventDefault();

    const content =
      answers &&
      `Give me a recommendation of the Netflix show I should watch following the conditions below.
     Subscribed Location:${
       answers[0] ? answers[0].answer : "Singapore"
     }, Genre:${answers[1] ? answers[1].answer : "Any"},
      Made in:${
        answers[2]
          ? answers[2].answer === "Others"
            ? "Other counrtires than Japan, Korea, and US"
            : answers[2].answer
          : "Any"
      },
      Current Mood:${answers[3] ? answers[3].answer : "Any"}、
      Show's Duration:${answers[4] ? answers[4].answer : "Any"}、
      Special Request:${textArea ? textArea : "Not Any"}
      Please specify URL and the year of the show has been released`;
    const res = await fetch("/api/chatgpt", {
      method: "POST",
      body: JSON.stringify({ content: content }),
    });

    const data = await res.json();

    const answer = data?.choices[0].message.content;
    const answerObj = answer && {
      type: "output",
      text: answer,
    };

    //   chatにプッシュする;
    setChatEn(data && [...chatEn, chatObj, holdOnObj, answerObj]);
    setcurrentOptionEn(data && "completed");
  };
  return {
    currentOptionEn,
    currentOptionObjEn,
    textArea,
    handleReset,
    handleOnClick,
    handleSubmit,
    handleTextAreaOnchange,
  };
};
