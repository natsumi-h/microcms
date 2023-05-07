import { atom } from "jotai";
import { chatArray, ChatType } from "../components/netflix/chatArray";
import { chatArrayEn } from "../components/netflix/en/chatArrayEn";

export const chatAtom = atom<ChatType>(chatArray);

export const currenOptionAtom = atom<string>("location");

export const chatAtomEn = atom<ChatType>(chatArrayEn);

export const currenOptionAtomEn = atom<string>("location");
