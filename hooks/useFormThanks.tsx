import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { formAtom } from "../state/form";

export const useFormThanks = () => {
  const [_, setData] = useAtom(formAtom);
  const router = useRouter();
  const onClick = () => {
    router.push("/contact");
    setData({
      firstName: "",
      lastName: "",
      email: "",
      emailConfirmation: "",
      newsletterRegistration: false,
    });
  };
  return { onClick };
};
