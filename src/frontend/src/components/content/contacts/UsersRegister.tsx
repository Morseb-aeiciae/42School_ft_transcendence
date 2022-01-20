import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiLocal3001 } from "../../../conf/axios.conf";
import ShowUserDetails from "./ShowUserDetails";

const displayUserCard = (props: any) => {
  return (
    <>
      <div className="p-2 border d-flex flex-row align-items-center">
        <div className="container">
          <img
            src={
              props.u.image
                ? props.u.image
                : "https://images.unsplash.com/photo-1590474879704-135dbd7f8ffd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80"
            }
            alt="img.user"
            style={{ width: "100px", height: "100px" }}
            className="rounded-circle bg-secondary"
          />
        </div>
        <div className="container text-center">
          <p>
            {props.u.username} <br />
            id :{props.u.id}
          </p>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => {
              props.setUser(props.u);
            }}
          >
            <i className="far fa-eye fs-1 text-dark"></i>
          </button>
        </div>
      </div>
    </>
  );
};

const UsersRegister = (props: any) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showUser, setUser] = useState({
    id: 0,
  });

  useEffect(() => {
    apiLocal3001
      .get("/profiles")
      .then((response: any) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("Chat:", err);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (showUser.id) {
    return (
      <ShowUserDetails
        userId={props.userId}
        target={showUser}
        setDisplay={props.setDisplay}
        setTarget={props.setTarget}
      />
    );
  } else if (users.length > 1) {
    return (
      <div className="d-flex flex-wrap">
        {users.map((u: any, index: number) => (
          <div key={index}>
            {u.id !== props.userId ? displayUserCard({ u, setUser }) : null}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        No user register except you in this website ! Youhou, crazy stuff !
      </div>
    );
  }
};

export default UsersRegister;
