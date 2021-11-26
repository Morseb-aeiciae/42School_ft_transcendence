// import { useState, useEffect } from "react";
// import { Loading } from "../..";
// import { apiChat } from "../../../conf/axios.conf_chats";
// import { apiChatAdmin } from "../../../conf/axios.conf_chats admin";
import ShowUserDetails from "../contacts/ShowUserDetails";

// const ShowUserForAdmin = () => {
//   return (
//     <section>
//       Need to copy ShowUserDetails when finish then add button for the admin of
//       a chat
//       <p>kick Ban/Unban Promote/Demote</p>
//     </section>
//   );
// };

const ShowUser = (props: any) => {
  // const [user, setUser] = useState({
  //   id: 0,
  //   adminlvl: 3,
  //   muted: "",
  //   banned: "",
  // });
  // const [userInfo, setUserI] = useState({
  //   // email: "",
  //   id: 0,
  //   image: "",
  //   username: "",
  // });
  // const [isLoading, setLoading] = useState(true);
  // const [admin, setAdmin] = useState(false);

  // const cId = props.chatId;
  // const uId = props.targetId;

  // useEffect(() => {
  //   apiChatAdmin
  //     .get(`/getAdminInfo/${cId}`)
  //     .then((response: any) => {
  //       const users = response.data;
  //       users.map((u: any) => {
  //         if (u.id === uId) {
  //           setUser(u);
  //         }
  //         return "patate";
  //       });
  //       setLoading(false);
  //     })
  //     .catch((err: any) => {
  //       console.log("Chat:", err);
  //       setLoading(false);
  //     });

  //   apiChat
  //     .get(`/getUsersOfChat/${cId}`)
  //     .then((response: any) => {
  //       const users = response.data;
  //       users.map((u: any) => {
  //         if (u.id === uId) {
  //           setUserI(u);
  //         }
  //         return "patate";
  //       });
  //       setLoading(false);
  //     })
  //     .catch((err: any) => {
  //       console.log("Chat:", err);
  //       setLoading(false);
  //     });
  // }, [cId, uId]);

  // if (isLoading) {
  //   return <Loading />;
  // } else if (!admin) {
    return (
      <ShowUserDetails target={{ id: props.targetId }} userId={props.userId} />
    );
  // } else return <ShowUserForAdmin />;
};

export default ShowUser;
