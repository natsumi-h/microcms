export const chatArray = [
  {
    type: "question",
    text: "こんにちは！&#x1F600;",
  },
  {
    type: "question",
    text: "今晩あなたが見るべきネットフリックスのコンテンツをご紹介します！&#128253;",
  },
  {
    type: "question",
    text: "ロケーションはどこですか？選択してください。",
  },
];

export type ChatType = {
  type: string;
  text: string;
}[];
