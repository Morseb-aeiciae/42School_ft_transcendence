import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiLocal3001 } from "../../../conf/axios.conf";
import { apiAdmin } from "../../../conf/axios.conf_admin";

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
          {props.u.role === "user" ? (
            <button
              className="btn btn-secondary mx-2"
              onClick={() => {
                props.setActionUser({
                  id: props.u.id,
                  action: 1,
                });
              }}
            >
              <i className="fas fa-angle-double-up fs-1 text-dark"></i>
            </button>
          ) : (
            <button
              className="btn btn-secondary mx-2"
              onClick={() => {
                props.setActionUser({
                  id: props.u.id,
                  action: 2,
                });
              }}
            >
              <i className="fas fa-angle-double-down fs-1 text-dark"></i>
            </button>
          )}
          {props.u.isBan ? (
            <button
              className="btn btn-success mx-2"
              onClick={() => {
                props.setActionUser({
                  id: props.u.id,
                  action: 3,
                });
              }}
            >
              <i className="fas fa-door-open fs-1"></i>
            </button>
          ) : (
            <button
              className="btn btn-danger mx-2"
              onClick={() => {
                props.setActionUser({
                  id: props.u.id,
                  action: 4,
                });
              }}
            >
              <i className="fas fa-door-closed fs-1"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const Users = (props: any) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [actionUser, setActionUser] = useState({ id: -1, action: 0 });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    apiLocal3001
      .get("/profiles")
      .then((response: any) => {
        setUsers(response.data);
        setTimeout(function () {
          setLoading(false);
        }, 200);
      })
      .catch((err: any) => {
        console.log("AdminPanel:", err);
        setTimeout(function () {
          setLoading(false);
        }, 200);
      });
  }, [reload]);

  useEffect(() => {
    switch (actionUser.action) {
      // action = 1 => promote
      case 1:
        apiAdmin
          .post("/giveAdminRights", { userId: actionUser.id })
          .then((response: any) => {})
          .catch((err: any) => {
            console.log("AdminPanel:", err);
          });
        break;
      // action = 2 => demote
      case 2:
        apiAdmin
          .post("/removeAdminRights", { userId: actionUser.id })
          .then((response: any) => {})
          .catch((err: any) => {
            console.log("AdminPanel:", err);
          });
        break;
      // action = 3 => ban
      case 3:
        apiAdmin
          .post("/unbanUser", { userId: actionUser.id })
          .then((response: any) => {})
          .catch((err: any) => {
            console.log("AdminPanel:", err);
          });
        break;
      // action = 4 => unban
      case 4:
        apiAdmin
          .post("/banUser", { userId: actionUser.id })
          .then((response: any) => {})
          .catch((err: any) => {
            console.log("AdminPanel:", err);
          });
        break;
    }
    if (actionUser.action) {
      setActionUser({
        id: -1,
        action: 0,
      });
      setTimeout(function () {
        setReload(!reload);
      }, 100);
    }
  }, [actionUser, reload]);

  if (isLoading) {
    return <Loading />;
  } else if (users.length > 1) {
    return (
      <div className="d-flex flex-wrap">
        {users.map((u: any, index: number) => (
          <div key={index}>
            {u.id !== props.user.id
              ? displayUserCard({ u, setActionUser })
              : null}
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

export default Users;
