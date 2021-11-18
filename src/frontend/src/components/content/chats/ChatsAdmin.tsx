import { useState, useEffect } from "react";
import { apiChat } from "../../../conf/axios.conf_chats";
import { apiChatAdmin } from "../../../conf/axios.conf_chats admin";

// /***************************************/
// // BanUserDTO
// // targetId: number;
// // adminId: number; userId
// // chatId: number;
// /***************************************/

// const BanUser = (props: any) => {
//   const [fetchData, setChats] = useState([]);

//   useEffect(() => {
//     apiChatAdmin
//       .post("/banUser")
//       .then((response: any) => {
//         console.log("banUser", response);
//       })
//       .catch((err: any) => {
//         console.log("Chats:", err);
//       });
//   }, []);

//   return <p>banUser</p>;
// };

// const UnbanUser = (props: any) => {
//   const [fetchData, setChats] = useState([]);

//   useEffect(() => {
//     apiChatAdmin
//       .post("/unbanUser")
//       .then((response: any) => {
//         console.log("unbanUser", response);
//       })
//       .catch((err: any) => {
//         console.log("Chats:", err);
//       });
//   }, []);

//   return <p>unbanUser</p>;
// };

// const MuteUser = (props: any) => {
//   const [fetchData, setChats] = useState([]);

//   useEffect(() => {
//     apiChatAdmin
//       .post("/muteUser")
//       .then((response: any) => {
//         console.log("muteUser", response);
//       })
//       .catch((err: any) => {
//         console.log("Chats:", err);
//       });
//   }, []);

//   return <p>muteUser</p>;
// };

// const UnmuteUser = (props: any) => {
//   const [fetchData, setChats] = useState([]);

//   useEffect(() => {
//     apiChatAdmin
//       .post("/unmuteUser")
//       .then((response: any) => {
//         console.log("unmuteUser", response);
//       })
//       .catch((err: any) => {
//         console.log("Chats:", err);
//       });
//   }, []);

//   return <p>unmuteUser</p>;
// };
// /***************************************/
// // SetAdminDTO
// // chatId: number;
// // ownerId: number; userId
// // adminId: number; targetId
// /***************************************/

// const RemoveAdmin = (props: any) => {
//   const [fetchData, setChats] = useState([]);

//   useEffect(() => {
//     apiChatAdmin
//       .post("/removeAdmin")
//       .then((response: any) => {
//         console.log("removeAdmin", response);
//       })
//       .catch((err: any) => {
//         console.log("Chats:", err);
//       });
//   }, []);

//   return <p>removeAdmin</p>;
// };

// const SetAdmin = (props: any) => {
//   //   const [fetchData, setChats] = useState([]);
//   useEffect(() => {
//     apiChatAdmin
//       .post("/setAdmin", {
//         chatId: props.props.chatId,
//         ownerId: props.props.userId,
//         adminId: props.props.user.id,
//       })
//       .then((response: any) => {
//         // console.log("setAdminResponse", response);
//       })
//       .catch((err: any) => {
//         console.log("Chats:", err);
//       });
//   }, []);

//   return (
//     <div
//       className="modal fade"
//       id="setAdmin"
//       tabIndex={-1}
//       aria-labelledby="setAdminLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog">
//         <div className="modal-content bg-dark text-light">
//           <div className="modal-header">
//             <h5 className="modal-title" id="setAdminLabel">
//               Modal title
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">...</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /****************************************************/

const UserOfChat = (props: any) => {
  const [content, setContent] = useState("");
  const targetId = props.user.id;

  console.log(props);
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

  return (
    <>
      {props.user.username}
      <br />
      <br />
      {props.userType === 0 ? (
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
      ) : null}
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

/*****************************************************/
const AdminPanel = (props: any) => {
  const chatId = props.chatId;
  const userId = props.userId;
  const userType = props.userType;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiChat
      .get(`/getUsersOfChat/${chatId}`)
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
      });
  }, [chatId]);

  return (
    <section>
      {users.map((u: any, index: number) => (
        <UserOfChat
          key={index}
          user={u}
          userType={userType}
          chatId={chatId}
          userId={userId}
        />
      ))}
    </section>
  );
};

export default AdminPanel;
