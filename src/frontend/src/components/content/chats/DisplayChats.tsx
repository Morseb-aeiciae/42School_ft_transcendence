import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";
import { Formik } from "formik";
import AdminPanel from "./ChatsAdmin";

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
  const submit = (values: any, action: any) => {
    apiChat
      .post("/addMessage", values)
      .then((response: any) => {
        action.setSubmitting(false);
      })
      .catch((err: any) => {
        console.log("creating chats", "err");
      });
  };

  return (
    <Formik
      onSubmit={submit}
      initialValues={{ chatId: props.chatId, userId: props.id, message: "" }}
    >
      {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
        <form
          className="d-flex flex-column flex-fill m-2"
          onSubmit={handleSubmit}
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
  useEffect(() => {
    apiChat
      .get(`getMessageOfChat/${props.chatId}`)

      // .post(`/getMessages`, { chatId: props.chatId, userId: props.id })
      .then((response: any) => {
        setMsg(response.data);
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

const FetchChat = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [userType, setUserType] = useState(2); // 0 owner | 1 admin | 2 user
  const [chat, setChat] = useState({
    id: -1,
    name: "",
    ownerId: -1,
    password: null,
    protection: 2,
  });
  const i = props.uId;
  const [displayAdmin, setdisplayAdmin] = useState(false);

  useEffect(() => {
    apiChat
      .get(`/getChat/${props.chatId}`)
      .then((response: any) => {
        if (response.data.ownerId === i) setUserType(0);
        setChat(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(`Chat ${props.chatId}:`, err);
      });
  }, [props.chatId]);

  if (isLoading) {
    return <Loading />;
  } else if (displayAdmin) {
    return (
      <AdminPanel
        chatId={props.chatId}
        userId={i}
        userType={userType}
        propsB={props}
      />
    );
  }

  return (
    <>
      <div className="container">
        <h2>{chat.name}</h2>
        {userType === 0 ? (
          <button
            onClick={() => {
              setdisplayAdmin(true);
            }}
            className="fas fa-cogs"
          ></button>
        ) : userType === 1 ? (
          <button
            onClick={() => {
              setdisplayAdmin(true);
            }}
            className="fas fa-cog"
          ></button>
        ) : null}
        <div className="d-flex border bg-primary text-dark">
          <hr />
          <div className="flex-fill border p-2 m-1 bg-light">
            <Messages id={i} chatId={props.chatId} />
            <MessageBar id={i} chatId={props.chatId} />
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
