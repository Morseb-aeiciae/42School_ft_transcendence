import { useEffect, useState } from "react";
import { apiChat } from "../../../conf/axios.conf_chats";

const ChatPeek = (props: any) => {
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    apiChat
      .get(`getMessageOfChat/${props.chatId}`)
      .then((response: any) => {
        setTimeout(function () {
          setMsg(response.data);
        }, 100);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [props.chatId, props.id, msg]);

  return (
    <>
      {msg.map((m: any, index: number) => (
        <div key={index}>
          {m.userId} : {m.message}
        </div>
      ))}
    </>
  );
};

export default ChatPeek;
