import { atom } from "jotai";

export type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmation: string;
  newsletterRegistration: boolean;
};

export const formAtom = atom<FormType>({
  firstName: "",
  lastName: "",
  email: "",
  emailConfirmation: "",
  newsletterRegistration: false,
});
