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

  return (
    <section>
      <div>User</div>
      <div className="rounded px-1 mb-1">{user.username}</div>
      <div className="rounded px-1 mb-1">{user.image}</div>
    </section>
  );
};

export default ShowUser;
