import { useEffect, useState } from "react";
import { apiChat } from "../../../conf/axios.conf_chats";
import { Loading } from "../..";
import { apiChatAdmin } from "../../../conf/axios.conf_chats admin";
import { Formik } from "formik";

const UserOfChat = (props: any) => {
  const [content, setContent] = useState("");
  const [R, setR] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    adminlvl: 3,
    banned: false,
    muted: false,
    userId: 0,
    chatId: 0,
  });
  const [target, setTarget] = useState({
    adminlvl: 4,
    banned: false,
    muted: false,
    userId: 0,
    chatId: 0,
  });
  const targetId = props.target.id;

  useEffect(() => {
    apiChatAdmin
      .get(`/getAdminInfo/${props.chatId}`)
      .then((response: any) => {
        const users = response.data;
        users.map((u: any) => {
          if (u.userId === targetId) {
            setTarget(u);
          } else if (u.userId === props.userId) {
            setCurrentUser(u);
          }
          return null;
        });
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [R, props.chatId, props.userId, targetId]);

  /******************     switch      ****************** */
  switch (content) {
    case "setAdmin": {
      apiChatAdmin
        .post("/setAdmin", {
          chatId: props.chatId,
          ownerId: props.userId,
          adminId: targetId,
        })
        .then((response: any) => {
          console.log("setAdminResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("chatAdmin:", err);
        });
      setContent("none");
      break;
    }
    case "removeAdmin": {
      apiChatAdmin
        .post("/removeAdmin", {
          chatId: props.chatId,
          ownerId: props.userId,
          adminId: targetId,
        })
        .then((response: any) => {
          console.log("removeAdminResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("chatAdmin:", err);
        });
      setContent("none");
      break;
    }
    case "mute": {
      apiChatAdmin
        .post("/muteUser", {
          chatId: props.chatId,
          targetId: targetId,
          adminId: props.userId,
        })
        .then((response: any) => {
          console.log("muteUserResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("chatAdmin:", err);
        });
      setContent("none");
      break;
    }
    case "unmute": {
      apiChatAdmin
        .post("/unmuteUser", {
          chatId: props.chatId,
          targetId: targetId,
          adminId: props.userId,
        })
        .then((response: any) => {
          console.log("unmuteUserResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("chatAdmin:", err);
        });
      setContent("none");
      break;
    }
    case "ban": {
      apiChatAdmin
        .post("/banUser", {
          chatId: props.chatId,
          targetId: targetId,
          adminId: props.userId,
        })
        .then((response: any) => {
          console.log("banUserResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("chatAdmin:", err);
        });
      setContent("none");
      break;
    }
    case "unban": {
      apiChatAdmin
        .post("/unbanUser", {
          chatId: props.chatId,
          targetId: targetId,
          adminId: props.userId,
        })
        .then((response: any) => {
          console.log("unbanUserResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("chatAdmin:", err);
        });
      setContent("none");
      break;
    }
    case "kick": {
      apiChat
        .post("/leaveChat", { userId: targetId, chatId: props.chatId })
        .then((response: any) => {
          console.log("kickAdmin", response);
          props.r(Math.random());
        })
        .catch((err: any) => {
          console.log("chatAdmin:", err);
        });
      setContent("none");
      break;
    }
    default: {
    }
  }
  /******************     switch      ****************** */

  return (
    <>
      {props.target.username}
      <br />
      <br />
      {currentUser.adminlvl === 1 ? (
        <>
          {target.adminlvl === 2 ? (
            <>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={() => {
                  setContent("removeAdmin");
                }}
              >
                removeAdmin
              </button>{" "}
            </>
          ) : (
            <>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={() => {
                  setContent("setAdmin");
                }}
              >
                setAdmin
              </button>{" "}
            </>
          )}
        </>
      ) : null}
      {target.muted ? (
        <>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            onClick={() => {
              setContent("unmute");
            }}
          >
            unmute
          </button>{" "}
        </>
      ) : (
        <>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            onClick={() => {
              setContent("mute");
            }}
          >
            mute
          </button>{" "}
        </>
      )}
      {target.banned ? (
        <>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            onClick={() => {
              setContent("unban");
            }}
          >
            unban
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            onClick={() => {
              setContent("ban");
            }}
          >
            ban
          </button>{" "}
        </>
      )}{" "}
      <>
        <button
          type="button"
          onClick={() => {
            setContent("kick");
          }}
        >
          kick
        </button>{" "}
      </>
      <div className="border-bottom pb-3 mb-3"></div>
      {/*    <--- MODAL --->     */}
      <div
        className="modal fade"
        id="modal"
        tabIndex={-1}
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                Admin
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Action done</div>
          </div>
        </div>
      </div>
      {/*    <--- MODAL --->     */}
    </>
  );
};

/******************** update pwd *********************/

const UpdatePwd = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    adminlvl: 3,
    userId: 0,
    chatId: 0,
  });
  useEffect(() => {
    apiChatAdmin
      .get(`/getAdminInfo/${props.chatId}`)
      .then((response: any) => {
        const users = response.data;
        users.map((u: any) => {
          if (u.userId === props.userId) {
            setCurrentUser(u);
          }
          return null;
        });
        setTimeout(function () {
          setLoading(false);
        }, 500);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [props.chatId, props.userId]);

  const submit = (values: any, action: any) => {
    apiChat
      .post("/updatePassword", {
        userId: currentUser.userId,
        chatId: currentUser.chatId,
        password: values.password,
      })
      .then((response: any) => {
        console.log("update Pwd :", response);
        action.setSubmitting(false);
      })
      .catch((err: any) => {
        console.log("Chats:", err);
        setTimeout(function () {
          setLoading(false);
        }, 500);
        action.setSubmitting(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <>
        {currentUser.adminlvl === 1 ? (
          <>
            <>
              <div className="border-bottom pb-3 mb-3"></div>
              <Formik onSubmit={submit} initialValues={{ password: "" }}>
                {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="Password"
                          placeholder="New password for the chat"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <button
                        type="submit"
                        data-bs-toggle="modalPwd"
                        data-bs-target="#modalPwd"
                        disabled={isSubmitting}
                      >
                        change password
                      </button>{" "}
                      <div className="border-bottom pb-3 mb-3"></div>
                    </form>
                  </>
                )}
              </Formik>
            </>
          </>
        ) : null}

        {/*    <--- MODAL --->     */}
        <div
          className="modal fade"
          id="modalPwd"
          tabIndex={-1}
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  Admin
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modalPwd"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Password changed</div>
            </div>
          </div>
        </div>
        {/*    <--- MODAL --->     */}
      </>
    );
};

/*****************************************************/

const AdminPanel = (props: any) => {
  const chatId = props.chatId;
  const userId = props.user.userId;
  const [users, setUsers] = useState([]);
  const [rKick, setRKick] = useState(0);

  useEffect(() => {
    apiChat
      .get(`/getUsersOfChat/${chatId}`)
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [chatId, rKick]);

  return (
    <section>
      <UpdatePwd userId={userId} chatId={chatId} />
      {users.map((u: any, index: number) => (
        <div key={index}>
          {u.id === props.ownerId ? (
            <>
              <p>{u.username} Owner of the chat ! Protected ^^</p>
              <div className="border-bottom pb-3 mb-3"></div>
            </>
          ) : u.id !== userId ? (
            <UserOfChat
              target={u}
              chatId={chatId}
              userId={userId}
              r={setRKick}
            />
          ) : (
            <>
              {u.username} ! Is it you ?! XD
              <div className="border-bottom pb-3 mb-3"></div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

const ManageUsersChat = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [owner, setUser] = useState({
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

  useEffect(() => {
    apiChatAdmin
      .get(`/getAdminInfo/${props.chatId}`)
      .then((response: any) => {
        const users = response.data;
        users.map((u: any) => {
          if (u.adminlvl === 1) {
            setUser(u);
          }
          return null;
        });
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
        setTimeout(function () {
          setLoading(false);
        }, 500);
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
  }, [props.chatId]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="border-bottom pb-3 mb-3"></div>
        <h1>
          CHAT {chat.name} - {chat.id}
        </h1>
        <AdminPanel
          user={owner}
          propsB={props}
          ownerId={chat.ownerId}
          chatId={props.chatId}
        />
      </>
    );
  }
};

export default ManageUsersChat;
