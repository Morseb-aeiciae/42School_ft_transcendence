import { useState, useEffect, useRef } from "react";
import { Loading } from "../..";
import { apiAdmin } from "../../../conf/axios.conf_admin";
import { apiChat } from "../../../conf/axios.conf_chats";
import ChatPeek from "./ChatPeek";
import ManageUsersChat from "./ManageUsersChat";

const displayChatCard = (props: any) => {
  return (
    <>
      <div className="p-2 border">
        <h4 className="text-center">{props.c.name}</h4>
        <p className="text-center">id :{props.c.id}</p>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => {
            props.setActionChat({
              id: props.c.id,
              action: 1,
            });
          }}
        >
          <i className="fas fa-tasks fs-1 text-dark"></i>
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => {
            props.setActionChat({
              id: props.c.id,
              action: 2,
            });
          }}
        >
          <i className="far fa-eye fs-1 text-dark"></i>
        </button>
        <button
          className="btn btn-danger mx-2"
          onClick={() => {
            props.setActionChat({
              id: props.c.id,
              action: 3,
            });
          }}
        >
          <i className="fas fa-trash-alt fs-1"></i>
        </button>
      </div>
    </>
  );
};

const Chats = (props: any) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [actionChat, setActionChat] = useState({ id: -1, action: 0 });
  const [reload, setReload] = useState(false);
  const mounted = useRef<HTMLDivElement>(null);

  useEffect(() => {
    apiChat
      .get("/getAllChats")
      .then((response: any) => {
        setChats(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("AdminPanel:", err);
        setLoading(false);
      });
  }, [reload]);

  useEffect(() => {
    if (actionChat.action === 3) {
      apiAdmin
        .post("/deleteChat", { chatId: actionChat.id })
        .then((response: any) => {})
        .catch((err: any) => {
          console.log("AdminPanel:", err);
        });
      if (mounted.current === null) return;
      setActionChat({
        id: -1,
        action: 0,
      });
      setTimeout(function () {
      if (mounted.current === null) return;
        setReload(!reload);
      }, 100);
    }
  }, [actionChat, reload, props]);

  if (isLoading) {
    return <Loading />;
  } else if (actionChat.action === 1) {
    return <ManageUsersChat chatId={actionChat.id} />;
  } else if (actionChat.action === 2) {
    return (
      <>
        <h4>Chat history : </h4>
        <div className="flex-fill border p-2 m-1 bg-darK">
          <ChatPeek chatId={actionChat.id} />
        </div>
      </>
    );
  } else if (chats.length > 0) {
    return (
      <div ref={mounted} className="d-flex flex-wrap">
        {chats.map((c: any, index: number) => (
          <div key={index}>
            {c.id !== props.userId
              ? displayChatCard({ c, setActionChat })
              : null}
          </div>
        ))}
      </div>
    );
  } else {
    return <div>No chats created yet !</div>;
  }
};

export default Chats;
