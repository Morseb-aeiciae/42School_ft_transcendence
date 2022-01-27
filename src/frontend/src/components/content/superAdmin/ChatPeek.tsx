import { useEffect, useRef, useState } from "react";
import { apiChat } from "../../../conf/axios.conf_chats";

const ChatPeek = (props: any) => {
  const [msg, setMsg] = useState([]);
  const mounted = useRef<HTMLDivElement>(null);

  useEffect(() => {
    apiChat
      .get(`getMessageOfChat/${props.chatId}`)
      .then((response: any) => {
        if (mounted.current === null) return;
        setTimeout(() => {
        if (mounted.current === null) return;
          setMsg(response.data);
        }, 200);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [props.chatId, props.id, msg]);

  return (
    <div ref={mounted}>
      {msg.map((m: any, index: number) => (
        <div key={index}>
          {m.userId} : {m.message}
        </div>
      ))}
    </div>
  );
};

export default ChatPeek;
