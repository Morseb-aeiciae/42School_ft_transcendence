import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";
import { Formik } from "formik";

const MessageBar = (props: any) => {
  const submit = (values: any, action: any) => {
    apiChat
      .post("/addMessage", values)
      .then((response: any) => {
        action.setSubmitting(false);
      })
      .catch((err: any) => {
        console.log("creating chats", err);
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
      .then((response: any) => {
        let msgs = response.data;
        setMsg(msgs);
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
  const [chat, setChat] = useState({
    id: -1,
    name: "",
    ownerId: -1,
    password: null,
    protection: 2,
  });
  const [blocked, setBlocked] = useState(false);

  const i = props.id;

  useEffect(() => {
    apiChat
      .get(`/getChat/${props.chatId}`)
      .then((response: any) => {
        setChat(response.data);
        setTimeout(function () {
          setLoading(false);
        }, 500);
      })
      .catch((err: any) => {
        console.log(`Chat ${props.chatId}:`, err);
      });

    apiChat
      .get(`/getBlockedUsers/${props.id}`)
      .then((response: any) => {
        const blockedUsers = response.data;
        blockedUsers.map((u: any) => {
          if (u.id === props.target) {
            setBlocked(true);
          }
          return null;
        });
      })
      .catch((err: any) => {
        console.log("Show Private chat :", err);
      });
  }, [props.chatId, i, props.id, props.target]);

  if (isLoading) return <Loading />;
  else if (blocked) {
    return <div>You blocked this user</div>;
  } else
    return (
      <>
        <div className="container">
          <h2>{chat.name}</h2>
          <div className="d-flex border bg-primary text-dark">
            <hr />
            <div className="flex-fill border p-2 m-1 bg-light">
              <Messages id={i} chatId={props.chatId} />
              <MessageBar id={i} chatId={props.chatId} />
            </div>
          </div>
        </div>
      </>
    );
};

const PrivateMsg = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [chat, setChat] = useState(-1);
  const target = props.targetId;
  const userId = props.userId;

  useEffect(() => {
    const userId_1 = target > userId ? userId : target;
    const userId_2 = target > userId ? target : userId;

    apiChat
      .post("/getDirectChat", { userId_1, userId_2 })
      .then((response: any) => {
        if (response.data.length === 0) {
          apiChat
            .post("/createDirectChat", { userId_1, userId_2 })
            .then((response: any) => {
              setChat(response.data.id);
            })
            .catch((err: any) => {
              console.log("PrivateMsg:", err);
              setTimeout(function () {
                setLoading(false);
              }, 500);
            });
        } else {
          setChat(response.data.id);
        }
        setTimeout(function () {
          setLoading(false);
        }, 500);
      })
      .catch((e: any) => {
        console.log("PrivateMsg", e);
      });
  }, [target, userId]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section className="d-flex flex-row">
        <FetchChat chatId={chat} target={target} id={userId} />
      </section>
    );
  }
};

export default PrivateMsg;
