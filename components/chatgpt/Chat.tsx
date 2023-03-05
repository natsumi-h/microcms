import React, { useState } from "react";
import ChatsComponent from "./ChatsComponent";
import OptionsComponent from "./OptionsComponent";
import { chatArray, ChatType } from "./chatArray";

export type Props = {
  props: {
    chat: ChatType;
    setChat: React.Dispatch<React.SetStateAction<ChatType>>;
    currentOption: string;
    setCurrentOption: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const Chat = () => {
  const [currentOption, setCurrentOption] = useState<string>("location");
  const [chat, setChat] = useState<ChatType>(chatArray);

  const props = {
    currentOption,
    setCurrentOption,
    chat,
    setChat,
  };

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col min-h-full">
      <ChatsComponent props={props}></ChatsComponent>
      <OptionsComponent props={props}></OptionsComponent>
    </div>
  );
};

export default Chat;
