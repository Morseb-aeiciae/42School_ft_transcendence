import { useState, useEffect, useContext } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";
import SearchBar, { ShowChats } from "./SearchBar";
import AuthContext from "../../../context";
import CreateChat from "./CreateChat";
import FetchChat from "./DisplayChats";
import { apiChatAdmin } from "../../../conf/axios.conf_chats admin";
import ShowUserDetails from "../contacts/ShowUserDetails";
import PrivateMsg from "../contacts/PrivateMsg";
import Duel from "../contacts/Duel";

const displayChatCard = (chat: any, setState: any, leave: any) => {
  if (chat.banned) {
    return (
      <>
        <div className="p-2 border">
          <h4 className="text-center">{chat.name}</h4>
          <p className="text-center">id :{chat.id}</p>
          <button className="btn text-light p-2 px-4 border">Banned</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="p-2 border">
          <h4 className="text-center">{chat.name}</h4>
          <p className="text-center">id :{chat.id}</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setState(chat.id);
            }}
          >
            <i className="fas fa-keyboard fs-1 text-dark"></i>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              leave(chat.id);
            }}
          >
            <i className="fas fa-trash-alt fs-1"></i>
          </button>
        </div>
      </>
    );
  }
};

const display = (chats: any, props: any) => {
  if (chats.length > 0 && props.props.stateId < 0) {
    return (
      <section>
        <div className="row g-4 m-1">
          {chats.map((chat: any, index: number) => (
            <div className="col-md-6 col-lg-3" key={index}>
              {displayChatCard(
                chat,
                props.props.setStateId,
                props.props.leaveChats
              )}
            </div>
          ))}
        </div>
      </section>
    );
  } else if (chats.length > 0) {
    return (
      <FetchChat
        uId={props.userId}
        chatId={props.props.stateId}
        showUser={props.props.setShowUser}
        refresh={props.props.setState}
      />
    );
  } else {
    return <section>No chat join yet</section>;
  }
};

const CurrentChats = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [fetchData, setChats] = useState([]);
  const [owner, setOwner] = useState(1);
  const [ownerCantLeave, setOwnerLeave] = useState(0);
  const id = props.userId;

  useEffect(() => {
    apiChat
      .get(`/getChatsOfUser/${id}`, {})
      .then((response: any) => {
        let chats = response.data.map((chat: any) => {
          apiChatAdmin
            .get(`/getAdminInfo/${chat.id}`)
            .then((response: any) => {
              const users = response.data;
              users.map((u: any) => {
                if (u.userId === props.userId) {
                  chat.banned = u.banned;
                }
                return null;
              });
            })
            .catch((err: any) => {
              console.log("Chat:", err);
            });
          return chat;
        });
        setChats(chats);
        setTimeout(function () {
          setTimeout(function () {
            setLoading(false);
          }, 200);
        }, 500);
      })
      .catch((err: any) => {
        console.log("Chats:", err);
        setTimeout(function () {
          setLoading(false);
        }, 500);
      });
  }, [id, props.props.state, props.userId]);

  useEffect(() => {
    if (props.props.leave > 0) {
      apiChat
        .post("/leaveChat", { userId: id, chatId: props.props.leave })
        .then((response: any) => {
          if (response.data.status === 409) setOwner(-owner);
          else {
            console.log("user leave a chat", response.data);
            // props.props.setState(Math.random());
            props.props.leaveChats(0);
          }
        })
        .catch((err: any) => {
          console.log("Chats:", err);
          setTimeout(function () {
            setLoading(false);
          }, 200);
        });
    }
  }, [id, props.props.leave, owner, props.props]);

  useEffect(() => {
    let len = 0;

    if (props.props.leave > 0)
      apiChat
        .get(`/getUsersOfChat/${props.props.leave}`)
        .then((response: any) => {
          len = response.data.length;
          if (len === 1) {
            apiChatAdmin
              .post("/deleteChat", { userId: id, chatId: props.props.leave })
              .then((response: any) => {
                console.log("owner delete a chat", response.data);
                // props.props.setState(Math.random());
                props.props.leaveChats(0);
              })
              .catch((err: any) => {
                console.log("Chats:", err);
                setTimeout(function () {
                  setLoading(false);
                }, 500);
              });
          } else {
            setOwnerLeave(1);
          }
        })
        .catch((err: any) => {
          console.log("Chat:", err);
        });
  }, [owner, id, props.props]);

  if (isLoading) {
    return <Loading />;
  } else if (ownerCantLeave) {
    return <p> Owner of chat can't leave if he's not the last</p>;
  } else return display(fetchData, props);
};

const Chats = () => {
  const context = useContext(AuthContext);
  const [state, setState] = useState(-1);
  const [stateId, setStateId] = useState(-1);
  const [leave, leaveChats] = useState(-1);
  const [showUser, setShowUser] = useState(-1);
  const [showChats, setShowChats] = useState([]);
  const [noChat, setNoChat] = useState(0);
  const [display, setDisplay] = useState(0);
  const [target, setTarget] = useState({
    id: 0,
  });

  const user = context.auth.user?.id;
  const props = {
    state,
    setState,
    stateId,
    setStateId,
    leave,
    leaveChats,
    setShowUser,
  };

  if (display === 2) {
    return <PrivateMsg targetId={target} userId={user} />;
  } else if (display === 3) {
    return <Duel targetId={target} userId={user} />;
  }
  if (showUser >= 0) {
    return (
      <section>
        <h1 className="border-bottom pb-3 mb-3">User</h1>
        <ShowUserDetails
          target={{ id: showUser }}
          userId={user}
          setDisplay={setDisplay}
          setTarget={setTarget}
        />
      </section>
    );
  } else if (showChats.length > 0) {
    return (
      <section>
        <h1 className="border-bottom pb-3 mb-3">CHATS</h1>
        <ShowChats
          chats={showChats}
          userId={user}
          resetChat={setShowChats}
          setState={setState}
        />
      </section>
    );
  } else if (noChat) {
    return (
      <section>
        <h1 className="border-bottom pb-3 mb-3">CHATS</h1>
        No chat created yet
      </section>
    );
  } else if (state < 0) {
    return (
      <section>
        <h1 className="border-bottom pb-3 mb-3">CHATS</h1>
        <div className="border-bottom pb-3 mb-3">
          <SearchBar showChats={setShowChats} noChat={setNoChat} />
        </div>
        <div className="border-bottom pb-3 mb-3">
          <CreateChat props={setState} />
        </div>
        <button
          onClick={() => {
            setState(1);
          }}
        >
          Show chat joined
        </button>
      </section>
    );
  } else {
    return (
      <section>
        <h1 className="border-bottom pb-3 mb-3">CHATS</h1>
        <CurrentChats userId={user} props={props} />
      </section>
    );
  }
};

export default Chats;
