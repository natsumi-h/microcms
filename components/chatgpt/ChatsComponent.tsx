import React, { FC } from "react";
import { ChatType } from "./chatArray";
import { Props } from "./Chat";

export const ChatsComponent: FC<Props> = (props) => {
  const { chat } = props.props;
  const parsedText = (text: string) => {
    // URLの正規表現パターン
    const urlPattern = /(https?:\/\/[^\s]+)/g;

    // text中のURLをaタグに変換する関数
    const convertToLink = (str: string) => {
      return str.replace(urlPattern, (url: string) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });
    };

    // 改行とURLを変換する
    const parsedText = convertToLink(text)
      .split("\n")
      .map((line, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
      ));

    return parsedText;
  };

  return (
    <>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
      >
        {chat.map((chat) =>
          chat.type === "question" ? (
            <div className="chat-message" key={chat.text}>
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-s max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-sky-100 text-black font-sans">
                      {parsedText(chat.text)}
                      {/* {chat.text} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="chat-message" key={chat.text}>
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-s max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white font-sans ">
                      {chat.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ChatsComponent;
