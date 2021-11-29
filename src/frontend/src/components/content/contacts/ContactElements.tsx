import { useEffect, useState } from "react";
import { apiFriends } from "../../../conf/axios.conf_friends";
import Duel from "./Duel";
import PrivateMsg from "./PrivateMsg";

const ContactElements = (props: any) => {
  console.log("log ::", props);
  const [rmv, setRmv] = useState(false);
  const [w, setW] = useState(false);
  const [c, setC] = useState(false);

  useEffect(() => {
    if (rmv)
      apiFriends
        .post("/removeFriends", {
          userId: props.userId,
          targetId: props.target.id,
        })
        .then((response: any) => {
          console.log("removeAdminResponse", response);
          props.setRefresh(Math.random());
        })
        .catch((err: any) => {
          console.log("User Details :", err);
        });
  }, [props, rmv]);

  if (w) {
    return <PrivateMsg targetId={props.target.id} userId={props.userId} />;
  } else if (c) {
    return <Duel targetId={props.target.id} userId={props.userId} />;
  } else 
  return (
    <>
      <div className="d-flex flex-row flex-wrap align-content-start">
        <div className="p-2 border">
          <h4 className="text-center">{props.target.username}</h4>
          <div>
            <img
              max-width="150"
              max-height="200"
              src={
                props.target.image
                  ? props.target.image
                  : "https://images.unsplash.com/photo-1590474879704-135dbd7f8ffd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80"
              }
              alt="img.user"
              style={{ width: "200px", height: "200px" }}
              className="rounded-circle bg-secondary "
            />
          </div>

          {/* <div className="d-flex flex-column p-2 border">
            <p className="text-center">History</p>
            <p className="text-center">
              <i className="fas fa-trophy"></i> {props.target.win}
            </p>
            <p className="text-center">
              <i className="fas fa-times-circle"></i> {props.target.loose}
            </p>
          </div> */}

          <br />
          <button
            onClick={() => {
              setW(true);
            }}
          >
            whisper
          </button>
          <button
            onClick={() => {
              setC(true);
            }}
          >
            challenge
          </button>
          <button
            className="btn-small btn-danger"
            onClick={() => {
              setRmv(true);
            }}
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactElements;
