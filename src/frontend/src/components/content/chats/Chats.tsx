import { useState, useEffect, useContext } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";
import SearchBar from "./SearchBar";
import AuthContext from "../../../context";
import CreateChat from "./CreateChat";
import FetchChat from "./DisplayChats";
import ShowUser from "./ShowUser";

const displayChatCard = (chat: any, setState: any, leave: any) => {
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
};

const display = (chats: any, props: any) => {
  if (chats.length > 0 && props.props.stateId === 0) {
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
      />
    );
  } else {
    return <section>No chat join yet</section>;
  }
};

const CurrentChats = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [fetchData, setChats] = useState([]);
  const id = props.userId;

  useEffect(() => {
    apiChat
      .get(`/getChatsOfUser/${id}`, {})
      .then((response: any) => {
        setChats(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("Chats:", err);
        setLoading(false);
      });
  }, [id, props.props.state]);

  useEffect(() => {
    apiChat
      .post("/leaveChat", { userId: id, chatId: props.props.leave })
      .then((response: any) => {
        console.log("user leave a chat", response.data);
      })
      .catch((err: any) => {
        console.log("Chats:", err);
        setLoading(false);
      });
  }, [id, props.props.leave]);

  if (isLoading) {
    return <Loading />;
  }
  return display(fetchData, props);
};

const Chats = () => {
  const context = useContext(AuthContext);
  const [state, setState] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [leave, leaveChats] = useState(0);
  const [showUser, setShowUser] = useState(-1);

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

  if (showUser >= 0) {
    return <ShowUser chatId={stateId} userId={showUser} />;
  }

  if (state === 0)
    return (
      <section>
        <h1 className="border-bottom pb-3 mb-3">CHATS</h1>
        <div className="border-bottom pb-3 mb-3">
          <SearchBar />
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

  return (
    <section>
      <CurrentChats userId={user} props={props} />
    </section>
  );
};

export default Chats;
