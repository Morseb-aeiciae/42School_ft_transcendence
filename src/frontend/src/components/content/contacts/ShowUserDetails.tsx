import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";
import Duel from "./Duel";
import PrivateMsg from "./PrivateMsg";

const ShowUserDetails = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [content, setContent] = useState("");
  const [R, setR] = useState(0);
  const target = props.target;
  const userId = props.userId;

  useEffect(() => {
    apiChat
      .get(`/getBlockedUsers/${userId}`)
      .then((response: any) => {
        const blockedUsers = response.data;
        blockedUsers.map((u: any) => {
          if (u.id === target.id) {
            setBlocked(true);
          }
          return null;
        });
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("ShowUserDetails:", err);
        setLoading(false);
      });
  }, [R, target.id, userId]);

  // console.log("log::", blocked);

  // /******************     switch      ****************** */
  switch (content) {
    //   case "Add": {
    //     apiChat
    //       .post("/???", {
    //          blockerId: userId,
    //          targetId: target.id,
    //       })
    //       .then((response: any) => {
    //         console.log("setAdminResponse", response);
    //          setR(Math.random());
    //       })
    //       .catch((err: any) => {
    //         console.log("User Details :", err);
    //       });
    //     setContent("none");
    //     break;
    //   }
    //   case "Rmv": {
    //     apiChat
    //       .post("/???", {
    //          blockerId: userId,
    //          targetId: target.id,
    //       })
    //       .then((response: any) => {
    //         console.log("removeAdminResponse", response);
    //          setR(Math.random());
    //       })
    //       .catch((err: any) => {
    //         console.log("User Details :", err);
    //       });
    //     setContent("none");
    //     break;
    //   }
    case "unblock": {
      apiChat
        .post("/unblockUser", {
          blockerId: userId,
          targetId: target.id,
        })
        .then((response: any) => {
          console.log("unblockUserResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("User Details :", err);
        });
      setContent("none");
      break;
    }
    case "block": {
      apiChat
        .post("/blockUser", {
          blockerId: userId,
          targetId: target.id,
        })
        .then((response: any) => {
          console.log("blockUserResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("User Details :", err);
        });
      setContent("none");
      break;
    }
    default: {
    }
  }
  // /******************     switch      ****************** */

  if (isLoading) {
    return <Loading />;
  } else if (content === "Msg") {
    return <PrivateMsg targetId={props.target.id} userId={userId} />;
  } else if (content === "Duel") {
    return <Duel targetId={props.target.id} userId={userId} />;
  } else {
    return (
      <section className="d-flex flex-row">
        <img
          src={
            target.image
              ? target.image
              : "https://images.unsplash.com/photo-1590474879704-135dbd7f8ffd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80"
          }
          alt="img.user"
          style={{ width: "200px", height: "200px" }}
          className="rounded-circle bg-secondary"
        />
        <div className="d-flex flex-column m-4">
          <p>Id : {target.id} </p>
          <p>Username : {target.username} </p>
          <div className="container">
            <button
              type="button"
              onClick={() => {
                setContent("Add");
              }}
            >
              Add contact
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                setContent("Rmv");
              }}
            >
              Remove contact
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                setContent("Msg");
              }}
            >
              Private msgs
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                setContent("Duel");
              }}
            >
              Duel
            </button>{" "}
            {blocked ? (
              <button
                type="button"
                onClick={() => {
                  setContent("unblock");
                }}
              >
                Unblock
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setContent("block");
                }}
              >
                Block
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }
};

export default ShowUserDetails;
