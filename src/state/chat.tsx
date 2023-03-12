import { atom } from "jotai";
import { chatArray, ChatType } from "../components/chatgpt/chatArray";

export const chatAtom = atom<ChatType>(chatArray);

export const currenOptionAtom = atom<string>("location");
