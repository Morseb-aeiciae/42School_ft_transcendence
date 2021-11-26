import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";

const PrivateMsg = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  // const [content, setContent] = useState("");
  const target = props.targetId;
  const userId = props.userId;

  useEffect(() => {
    const userId_1 = target > userId ? userId : target;
    const userId_2 = target > userId ? target : userId;

    apiChat
      .post("/createDirectChat", { userId_1, userId_2 })
      .then((response: any) => {
        console.log(response);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("PrivateMsg:", err);
        setLoading(false);
      });
  }, [target, userId]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section className="d-flex flex-row">
        <p>Private chat for the 2 users incomming</p>
      </section>
    );
  }
};

export default PrivateMsg;
