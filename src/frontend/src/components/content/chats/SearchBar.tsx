import { Component, useState, useEffect } from "react";
import { Formik } from "formik";
import { apiChat } from "../../../conf/axios.conf_chats";
import { Loading } from "../..";

const DisplayChatCard = (chat: any, user: any) => {
  const [isLoading, setLoading] = useState(true);
  const [showChat, setChat] = useState(false);
  const [join, setjoin] = useState(false);
  let pwd: any = undefined;

  useEffect(() => {
    apiChat
      .post("/isUserOnChat", { userId: user, chatId: chat.id })
      .then((response: any) => {
        if (response.data) setChat(true);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("Chats:", err);
        setLoading(false);
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
          console.log(response);

          // if (response.data) setChat(true);
          // setLoading(false);
        })
        .catch((err: any) => {
          console.log("Chats:", err);
          setLoading(false);
        });
  }, [user, chat.id]);

  if (isLoading) {
    return <Loading />;
  }
  if (!showChat)
    return (
      <div className="p-2 border">
        <h4 className="text-center">{chat.name}</h4>
        <p className="text-center">id :{chat.id}</p>
        <button
          className="btn btn-success"
          onClick={() => {
            setjoin(true);
          }}
        >
          <i className="fas fa-door-open fs-1 text-dark"></i>
        </button>
      </div>
    );
};

const ShowChats = (props: any) => {
  return (
    <section>
      <div className="row g-4 m-1">
        {props.chats.map((chat: any, index: number) => (
          <div className="col-md-6 col-lg-3" key={index}>
            {DisplayChatCard(chat, props.userId)}
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
            {/* <div className="d-flex flex-row p-1">
              <input
                name="query"
                className="flex-fill form-control mr-2"
                placeholder="Search ..."
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <select
                name="type"
                className="mr-2 form-control w-25"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="d-flex flex-row p-1">
              <div className="d-flex flex-row flex-grow-1 align-items-end justify-content-evenly">
                <p>
                  <input
                    type="radio"
                    name="protected"
                    id="false"
                    value="no"
                    checked
                    onChange={handleChange}
                  />
                  <label htmlFor="false"> no protected</label>
                </p>
                <p>
                  <input
                    type="radio"
                    name="protected"
                    id="true"
                    value="yes"
                    onChange={handleChange}
                  />
                  <label htmlFor="false"> protected</label>
                </p>
              </div> */}
            <button
              className="btn btn-outline-secondary btn-lg"
              type="submit"
              disabled={isSubmitting}
              // onClick={() => {
              //   this.props.showChats(1);
              // }}
            >
              {/* Submit */}
              Search Chat
            </button>
            {/* </div> */}
          </form>
        )}
      </Formik>
    );
  }
}
