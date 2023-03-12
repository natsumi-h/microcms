import { useAtom } from "jotai";
import { chatAtom } from "../state/chat";

export const useChatComponent = () => {
  const [chat] = useAtom(chatAtom);

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

  return { chat, parsedText };
};
