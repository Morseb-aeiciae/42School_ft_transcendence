import { useState, useEffect, useRef } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";
import { Formik } from "formik";
import AdminPanel from "./ChatsAdmin";
import { apiChatAdmin } from "../../../conf/axios.conf_chats admin";

const ChatUsers = (props: any) => {
  const [users, setUsers] = useState([]);
  const i = props.id;

  useEffect(() => {
    apiChat
      .get(`/getUsersOfChat/${i}`)
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [i]);

  return (
    <>
      <div>Chat users</div>
      {users.map((u: any, index: number) => (
        <button
          key={index}
          onClick={() => {
            props.showUser(u.id);
          }}
        >
          {u.username}
        </button>
      ))}
    </>
  );
};

const MessageBar = (props: any) => {
  const [r, setR] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    banned: false,
  });

  useEffect(() => {
    // check if the user is ban of the chat and allow to send msg

    apiChatAdmin
      .get(`/getAdminInfo/${props.chatId}`)
      .then((response: any) => {
        if (props.mounted.current === null) return;
        const users = response.data;
        users.map((u: any) => {
          if (u.userId === props.id) {
            if (props.mounted.current === null) return 0;
            setCurrentUser(u);
          }
          return null;
        });
        setTimeout(function () {
          setR(Math.random());
        }, 200);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [r, props.chatId, props.id, props.mounted]);

  const submit = (values: any, action: any) => {
    if (!currentUser.banned && values.message)
      apiChat
        .post("/isUserOnChat", { userId: props.id, chatId: props.chatId })
        .then((response: any) => {
          if (response.data) {
            apiChat
              .post("/addMessage", values)
              .then((response: any) => {
                // Clear msg sending bar => too long
                // (document.getElementById("form") as HTMLFormElement).reset();
                // values.message = "";
                action.setSubmitting(false);
              })
              .catch((err: any) => {
                console.log("chats msg bar", err);
              });
          }
        })
        .catch((err: any) => {
          console.log("Chats:", err);
        });
    else if (!values.message) action.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize={true}
      onSubmit={submit}
      initialValues={{
        chatId: props.chatId,
        userId: props.id,
        message: "",
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
        <form
          className="d-flex flex-column flex-fill m-2"
          onSubmit={handleSubmit}
          id="form"
        >
          <div className="d-flex flex-row p-1">
            <div className="d-flex flex-row flex-grow-1 align-items-end justify-content-evenly">
              <input
                id="message"
                name="message"
                className="flex-fill form-control mr-2"
                placeholder="Message ..."
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <button
              className="btn btn-outline-secondary btn-lg"
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

const Messages = (props: any) => {
  const [msg, setMsg] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [muted, setMuted] = useState([]);

  useEffect(() => {
    apiChatAdmin
      .get(`/getAdminInfo/${props.chatId}`)
      .then((response: any) => {
        const mutedUsers = response.data.filter((e: any) => {
          return e.muted !== false;
        });
        setMuted(mutedUsers);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [props.chatId]);

  useEffect(() => {
    apiChat
      .get(`/getBlockedUsers/${props.id}`)
      .then((response: any) => {
        const blockedUsers = response.data;
        setBlocked(blockedUsers);
      })
      .catch((err: any) => {
        console.log("ShowUserDetails:", err);
      });
  }, [props.id]);

  useEffect(() => {
    apiChat
      .get(`getMessageOfChat/${props.chatId}`)
      .then((response: any) => {
        if (props.mounted.current === null) return;
        let msgs = response.data;
        //muted contacts
        muted.map(
          (m: any) =>
            (msgs = response.data.filter((e: any) => {
              return e.userId !== m.id;
            }))
        );
        //blocked contacts
        blocked.map(
          (b: any) =>
            (msgs = response.data.filter((e: any) => {
              return e.userId !== b.id;
            }))
        );
        // setMsg(msgs);
        setTimeout(function () {
          if (props.mounted.current === null) return;
          setMsg(msgs);
        }, 100);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [props.chatId, props.id, msg, blocked, muted, props.mounted]);

  return (
    <>
      {msg.map((m: any, index: number) => (
        <div
          key={index}
          className="d-flex align-items-start justify-content-start"
        >
          {m.userId} : {m.message}
        </div>
      ))}
    </>
  );
};

const FetchChat = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({
    adminlvl: 4,
    banned: false,
    muted: false,
    userId: 0,
    chatId: 0,
  });
  const [chat, setChat] = useState({
    id: -1,
    name: "",
    ownerId: -1,
    password: null,
    protection: 2,
  });
  const i = props.uId;
  const [displayAdmin, setdisplayAdmin] = useState(false);
  const mounted = useRef<HTMLDivElement>(null);

  useEffect(() => {
    apiChatAdmin
      .get(`/getAdminInfo/${props.chatId}`)
      .then((response: any) => {
        const users = response.data;
        users.map((u: any) => {
          if (u.userId === i) {
            setUser(u);
          }
          return null;
        });
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
        setLoading(false);
      });

    apiChat
      .get(`/getChat/${props.chatId}`)
      .then((response: any) => {
        setChat(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(`Chat ${props.chatId}:`, err);
      });
  }, [props.chatId, i]);

  if (isLoading) {
    return <Loading />;
  } else if (displayAdmin) {
    return (
      <AdminPanel
        user={user}
        propsB={props}
        ownerId={chat.ownerId}
        chatId={props.chatId}
      />
    );
  }

  return (
    <>
      <div className="container">
        <h2>{chat.name}</h2>
        {user.adminlvl === 1 ? (
          <button
            onClick={() => {
              setdisplayAdmin(true);
            }}
            className="fas fa-cogs"
          ></button>
        ) : user.adminlvl === 2 ? (
          <button
            onClick={() => {
              setdisplayAdmin(true);
            }}
            className="fas fa-cog"
          ></button>
        ) : null}
        <div className="d-flex border bg-primary text-dark">
          <hr />
          <div ref={mounted} className="flex-fill border p-2 m-1 bg-light">
            <Messages id={i} chatId={props.chatId} mounted={mounted} />
            <MessageBar id={i} chatId={props.chatId} mounted={mounted} />
          </div>
          <div className="m-2">
            <ChatUsers id={props.chatId} showUser={props.showUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FetchChat;
