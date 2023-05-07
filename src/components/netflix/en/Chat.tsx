import ChatsComponent from "./ChatsComponent";
import OptionsComponent from "./OptionsComponent";

export const Chat = () => {
  return (
    <div className="flex-1  justify-between flex flex-col min-h-full">
      <ChatsComponent></ChatsComponent>
      <OptionsComponent></OptionsComponent>
    </div>
  );
};

export default Chat;
