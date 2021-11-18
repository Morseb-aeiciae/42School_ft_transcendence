import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";

const ShowUser = (props: any) => {
  const [user, setUser] = useState({
    // email: "",
    id: 0,
    image: "",
    username: "",
  });
  const [isLoading, setLoading] = useState(true);

  const cId = props.chatId;
  const uId = props.userId;

  useEffect(() => {
    apiChat
      .get(`/getUsersOfChat/${cId}`)
      .then((response: any) => {
        const users = response.data;
        users.map((u: any) => {
          if (u.id === uId) {
            setUser(u);
          }
          return "patate";
        });
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
        setLoading(false);
      });
  }, [cId, uId]);

  if (isLoading) {
    return <Loading />;
  }
  console.log("chat -> user :", user);
  return (
    <section>
      <div>User</div>
      <div className="rounded px-1 mb-1">{user.username}</div>
      <div className="rounded px-1 mb-1">{user.image}</div>
    </section>
  );
};

export default ShowUser;

// import { useState, useEffect } from "react";
// import { apiChat } from "../../../conf/axios.conf_chats";
// import { apiChatAdmin } from "../../../conf/axios.conf_chats admin";

// const UserOfChat = (props: any) => {
//   const [content, setContent] = useState("");
//   const targetId = props.user.id;

//   console.log(props);
//   switch (content) {
//     case "setAdmin": {
//       apiChatAdmin
//         .post("/setAdmin", {
//           chatId: props.chatId,
//           ownerId: props.userId,
//           adminId: targetId,
//         })
//         .then((response: any) => {
//           console.log("setAdminResponse", response);
//         })
//         .catch((err: any) => {
//           console.log("chatAdmin:", err);
//         });
//       setContent("none");

//       break;
//     }
//     case "removeAdmin": {
//       apiChatAdmin
//         .post("/removeAdmin", {
//           chatId: props.chatId,
//           ownerId: props.userId,
//           adminId: targetId,
//         })
//         .then((response: any) => {
//           console.log("removeAdminResponse", response);
//         })
//         .catch((err: any) => {
//           console.log("chatAdmin:", err);
//         });
//       setContent("none");
//       break;
//     }
//     case "mute": {
//       apiChatAdmin
//         .post("/muteUser", {
//           chatId: props.chatId,
//           targetId: targetId,
//           adminId: props.userId,
//         })
//         .then((response: any) => {
//           console.log("muteUserResponse", response);
//         })
//         .catch((err: any) => {
//           console.log("chatAdmin:", err);
//         });
//       setContent("none");

//       break;
//     }
//     case "unmute": {
//       apiChatAdmin
//         .post("/unmuteUser", {
//           chatId: props.chatId,
//           targetId: targetId,
//           adminId: props.userId,
//         })
//         .then((response: any) => {
//           console.log("unmuteUserResponse", response);
//         })
//         .catch((err: any) => {
//           console.log("chatAdmin:", err);
//         });
//       setContent("none");

//       break;
//     }
//     case "ban": {
//       apiChatAdmin
//         .post("/banUser", {
//           chatId: props.chatId,
//           targetId: targetId,
//           adminId: props.userId,
//         })
//         .then((response: any) => {
//           console.log("banUserResponse", response);
//         })
//         .catch((err: any) => {
//           console.log("chatAdmin:", err);
//         });
//       setContent("none");

//       break;
//     }
//     case "unban": {
//       apiChatAdmin
//         .post("/unbanUser", {
//           chatId: props.chatId,
//           targetId: targetId,
//           adminId: props.userId,
//         })
//         .then((response: any) => {
//           console.log("unbanUserResponse", response);
//         })
//         .catch((err: any) => {
//           console.log("chatAdmin:", err);
//         });
//       setContent("none");

//       break;
//     }
//     default: {
//     }
//   }

//   return (
//     <>
//       {props.user.username}
//       <br />
//       <br />
//       {props.userType === 0 ? (
//         <>
//           <button
//             type="button"
//             data-bs-toggle="modal"
//             data-bs-target="#modal"
//             onClick={() => {
//               setContent("removeAdmin");
//             }}
//           >
//             removeAdmin
//           </button>{" "}
//           <button
//             type="button"
//             data-bs-toggle="modal"
//             data-bs-target="#modal"
//             onClick={() => {
//               setContent("setAdmin");
//             }}
//           >
//             setAdmin
//           </button>{" "}
//         </>
//       ) : null}
//       <button
//         type="button"
//         data-bs-toggle="modal"
//         data-bs-target="#modal"
//         onClick={() => {
//           setContent("unmute");
//         }}
//       >
//         unmute
//       </button>{" "}
//       <button
//         type="button"
//         data-bs-toggle="modal"
//         data-bs-target="#modal"
//         onClick={() => {
//           setContent("mute");
//         }}
//       >
//         mute
//       </button>{" "}
//       <button
//         type="button"
//         data-bs-toggle="modal"
//         data-bs-target="#modal"
//         onClick={() => {
//           setContent("ban");
//         }}
//       >
//         ban
//       </button>{" "}
//       <button
//         type="button"
//         data-bs-toggle="modal"
//         data-bs-target="#modal"
//         onClick={() => {
//           setContent("unban");
//         }}
//       >
//         unban
//       </button>
//       <div className="border-bottom pb-3 mb-3"></div>
//       {/*    <--- MODAL --->     */}
//       <div
//         className="modal fade"
//         id="modal"
//         tabIndex={-1}
//         aria-labelledby="modalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content bg-dark text-light">
//             <div className="modal-header">
//               <h5 className="modal-title" id="modalLabel">
//                 Admin
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">Action done</div>
//           </div>
//         </div>
//       </div>
//       {/*    <--- MODAL --->     */}
//     </>
//   );
// };
