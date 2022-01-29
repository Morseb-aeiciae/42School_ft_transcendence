import { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { createSolutionBuilderHost } from "typescript";
import { Loading } from "../..";
import { apiChat } from "../../../conf/axios.conf_chats";
import { apiFriends } from "../../../conf/axios.conf_friends";
import { apiMatch } from "../../../conf/axios.conf_match";

const ShowUserDetails = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [friend, setFriend] = useState(false);
  const [content, setContent] = useState("");
  const [R, setR] = useState(0);
  const [add, setAdd] = useState(false);
  const target = props.target;
  const userId = props.userId;
  const [watch, setWatch] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    apiMatch
      .get(`getMatchsOfUser/${props.target.id}`)
      .then((response: any) => {
        setMatches(response.data);
      })
      .catch((err: any) => {
        console.log("history:", err);
      });
  }, [props.target.id]);

  useEffect(() => {
    apiFriends
      .post("/isFriends", { userId, targetId: target.id })
      .then((response: any) => {
       // console.log("RES + ", response)
        setFriend(response.data);
      })
      .catch((err: any) => {
        console.log("isFriends:", err);
      });
  }, [R, userId, target.id, friend]);

  useEffect(() => {
    apiChat
      .get(`/getBlockedUsers/${userId}`)
      .then((response: any) => {
        setBlocked(false);
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

  // /******************     switch      ****************** */
  switch (content) {
    case "Add": {
      apiFriends
        .post("/sendFriendInvite", {
          userId: userId,
          targetId: target.id,
        })
        .then((response: any) => {
          // console.log("setAdminResponse", response);
          if (!response.data) setAdd(true);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("User Details :", err);
        });
      setContent("none");
      break;
    }
    case "Rmv": {
      apiFriends
        .post("/removeFriends", {
          userId: userId,
          targetId: target.id,
        })
        .then((response: any) => {
          // console.log("removeAdminResponse", response);
          setR(Math.random());
        })
        .catch((err: any) => {
          console.log("User Details :", err);
        });
      setContent("none");
      break;
    }
    case "unblock": {
      apiChat
        .post("/unblockUser", {
          blockerId: userId,
          targetId: target.id,
        })
        .then((response: any) => {
          // console.log("unblockUserResponse", response);
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
          // console.log("blockUserResponse", response);
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
  if (watch) {
    return (
      <Iframe
        url="../pong3D.html"
        position="absolute"
        width="100%"
        id="myId"
        className="pong3D"
        height="50%"
      />
    );
  }
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section>
        <div className="d-flex flex-row">
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
              {friend ? (
                <button
                  type="button"
                  onClick={() => {
                    setContent("Rmv");
                  }}
                >
                  Remove contact
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setContent("Add");
                  }}
                >
                  Add contact
                </button>
              )}{" "}
              <button
                type="button"
                onClick={() => {
                  props.setDisplay(2);
                  props.setTarget(target.id);

                  // setContent("Msg");
                }}
              >
                Private msgs
              </button>{" "}
              <button
                type="button"
                onClick={() => {
                  props.setDisplay(3);
                  props.setTarget(target.id);

                  // setContent("Duel");
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
            {props.target.status === "ongame" ? (
              <>
                <br />
                <button
                  className="btn-small"
                  onClick={() => {
                    localStorage.setItem("user", props.target.id);
					localStorage.setItem("username", props.username);
                    localStorage.setItem("spect", props.userId);
                    setWatch(true);
                  }}
                >
                  watch Match
                </button>
              </>
            ) : null}
            {add ? (
              <p>Request already sent, waiting user to add you too</p>
            ) : null}
          </div>
        </div>
        <br />
        {matches ? (
          <>
            Match history :
            {matches.map((m: any, index: number) => (
              <div
                key={index}
                className="d-flex justify-content-between container"
              >
                {m.winner_1 ? (
                  <p className="text-warning">
                    <i className="fas fa-crown"></i> {m.user_1.username}{" "}
                    {m.pts_1}
                  </p>
                ) : (
                  <p className="text-info">
                    {m.user_1.username} {m.pts_1}
                  </p>
                )}
                {m.winner_2 ? (
                  <p className="text-warning">
                    {m.user_2.username} {m.pts_2}{" "}
                    <i className="fas fa-crown"></i>
                  </p>
                ) : (
                  <p className="text-info">
                    {m.user_2.username} {m.pts_2}
                  </p>
                )}
              </div>
            ))}
          </>
        ) : (
          <p>No match played yet</p>
        )}
      </section>
    );
  }
};

export default ShowUserDetails;
