import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiLocal3001 } from "../../../conf/axios.conf";
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
  // console.log("Admin panel : user ", props);

  const [chats, setChats] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [actionChat, setActionChat] = useState({ id: -1, action: 0 });

  useEffect(() => {
    apiLocal3001
      .get("/getChatList")
      .then((response: any) => {
        console.log("superAdmin-> chats -> fix call address for api");

        setChats(response.data);
        setTimeout(function () {
          setLoading(false);
        }, 500);
      })
      .catch((err: any) => {
        console.log("AdminPanel:", err);
        setTimeout(function () {
          setLoading(false);
        }, 500);
      });
  }, []);

  useEffect(() => {
    if (actionChat.action) {
      // action = 1 => manage ... redirect
      // action = 2 => view
      // action = 3 => delte
    }
  }, [actionChat]);

  console.log(chats);
  if (isLoading) {
    return <Loading />;
  } else if (actionChat.action === 1) {
    return <ManageUsersChat />;
  } else if (chats.length > 1) {
    return (
      <div className="d-flex flex-wrap">
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
