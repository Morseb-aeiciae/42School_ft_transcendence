import { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import { apiChat } from "../../../conf/axios.conf_chats";
import { Loading } from "../..";
import WrongInput from "../../utils/Pages/WrongInput";
import { apiChatAdmin } from "../../../conf/axios.conf_chats admin";

const DisplayChatCard = (chat: any, user: any, reload: any, resetChat: any) => {
  const [isLoading, setLoading] = useState(true);
  const [showChat, setChat] = useState(false);
  const [join, joining] = useState(false);
  const [needPwd, setNeed] = useState(false);
  const [wrongPwd, setWrong] = useState(false);
  let pwd: any = undefined;

  const [currentUser, setCurrentUser] = useState({
    banned: false,
  });

  useEffect(() => {
    apiChatAdmin
      .get(`/getAdminInfo/${chat.id}`)
      .then((response: any) => {
        const users = response.data;
        users.map((u: any) => {
          if (u.userId === user) {
            setCurrentUser(u);
          }
          return null;
        });
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [user, chat.id]);

  useEffect(() => {
    apiChat
      .post("/isUserOnChat", { userId: user, chatId: chat.id })
      .then((response: any) => {
        if (response.data) setChat(true);
        setTimeout(function () {
          setLoading(false);
        }, 200);
      })
      .catch((err: any) => {
        console.log("Chats:", err);
        setTimeout(function () {
          setLoading(false);
        }, 200);
      });
  }, [user, chat.id]);

  useEffect(() => {
    if (join)
      apiChat
        .post("/addUserToChat", {
          userId: user,
          chatId: chat.id,
          password: pwd,
        })
        .then((response: any) => {
          if (response.data.chat) {
            resetChat([]);
            reload(Math.random());
          } else if (response.data.response.statusCode === 401) {
            setNeed(true);
          }
        })
        .catch((err: any) => {
          console.log("Chats:", err);
          setTimeout(function () {
            setLoading(false);
          }, 200);
        });
  }, [user, chat.id, join, pwd, resetChat, reload]);

  const submit = (values: any, action: any) => {
    if (join)
      apiChat
        .post("/addUserToChat", {
          userId: user,
          chatId: chat.id,
          password: values.pwd,
        })
        .then((response: any) => {
          setNeed(false);

          if (response.data.chat) {
            resetChat([]);
            reload(Math.random());
          } else if (response.data.response.statusCode === 401) {
            setWrong(true);
            setNeed(true);
          }
          action.setSubmitting(false);
        })
        .catch((err: any) => {
          console.log("Chats:", err);
          setTimeout(function () {
            setLoading(false);
          }, 200);
          action.setSubmitting(false);
        });
  };
  if (isLoading) {
    return <Loading />;
  } else if (wrongPwd) {
    return <WrongInput setWrong={setWrong} />;
  } else if (!showChat && !needPwd) {
    return (
      <div className="p-2 border">
        <h4 className="text-center">{chat.name}</h4>
        <p className="text-center">id :{chat.id}</p>
        <button
          className="btn btn-success"
          onClick={() => {
            joining(true);
          }}
        >
          <i className="fas fa-door-open fs-1 text-dark"></i>
        </button>
      </div>
    );
  } else if (!showChat && needPwd) {
    return (
      <>
        <div className="p-2 border">
          <h4 className="text-center">{chat.name}</h4>
          <p className="text-center">id :{chat.id}</p>
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            onClick={() => {
              joining(true);
            }}
          >
            <i className="fas fa-door-open fs-1 text-dark"></i>
          </button>
        </div>
        {/*    <--- MODAL --->     */}
        <div
          className="modal"
          id="modal"
          tabIndex={-1}
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  Password needed
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Formik onSubmit={submit} initialValues={{ pwd }}>
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className="container d-flex justify-content-between">
                          <div className="px-2 flex-fill ">
                            <input
                              name="pwd"
                              type="pwd"
                              className="form-control"
                              id="pwd"
                              placeholder="Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                            data-bs-dismiss={"modal"}
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        {/*    <--- MODAL --->     */}
      </>
    );
  } else {
    return (
      <div className="p-2 border">
        <h4 className="text-center">{chat.name}</h4>
        <p className="text-center">id :{chat.id}</p>
        <button className="btn text-light p-2 px-4 border">
          {currentUser.banned ? (
            <span>Banned</span>
          ) : (
            <span>Already joined</span>
          )}
        </button>
      </div>
    );
  }
};

const ShowChats = (props: any) => {
  return (
    <section>
      <div className="row g-4 m-1">
        {props.chats.map((chat: any, index: number) => (
          <div className="col-md-6 col-lg-3" key={index}>
            {DisplayChatCard(
              chat,
              props.userId,
              props.setState,
              props.resetChat
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
export { ShowChats };

interface SBProps {
  [name: string]: any;
}

export default class SearchBar extends Component<SBProps> {
  submit = (values: any, actions: any) => {
    apiChat
      .get("/getChatList/")
      .then((response: any) => {
        if (response.data.length) this.props.showChats(response.data);
        else this.props.noChat(1);
      })
      .catch((err: any) => {
        console.log("Chats:", err);
      });
  };

  render() {
    return (
      <Formik
        onSubmit={this.submit}
        initialValues={{ query: "", type: "public", protected: "no" }}
      >
        {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form
            className="d-flex flex-column flex-fill m-2"
            onSubmit={handleSubmit}
          >
            <button
              className="btn btn-outline-secondary btn-lg"
              type="submit"
              disabled={isSubmitting}
            >
              Search Chat
            </button>
          </form>
        )}
      </Formik>
    );
  }
}
