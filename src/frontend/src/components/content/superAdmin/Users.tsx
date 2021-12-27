import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiLocal3001 } from "../../../conf/axios.conf";

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
              props.setActionUser({
                id: props.u.id,
                action: 1,
              });
            }}
          >
            <i className="fas fa-angle-double-up fs-1 text-dark"></i>
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => {
              props.setActionUser({
                id: props.u.id,
                action: 2,
              });
            }}
          >
            <i className="fas fa-ban fs-1"></i>
          </button>
        </div>
      </div>
    </>
  );
};

const Users = (props: any) => {
  // console.log("Admin panel : user ", props);

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [actionUser, setActionUser] = useState({ id: -1, action: 0 });

  useEffect(() => {
    apiLocal3001
      .get("/profiles")
      .then((response: any) => {
        setUsers(response.data);
        setTimeout(function () {
          setLoading(false);
        }, 500);
      })
      .catch((err: any) => {
        console.log("AdminPanel:", err);
        setTimeout(function () {
          setLoading(false);
        }, 500);
      });
  }, []);

  useEffect(() => {
    if (actionUser.action) {
      // action = 1 => promote
      // action = 2 => ban
    }
  }, [actionUser]);

  if (isLoading) {
    return <Loading />;
  } else if (users.length > 1) {
    return (
      <>
        {users.map((u: any, index: number) => (
          <div className="col-sm-6 col-md-6 col-lg-5 col-xl-3" key={index}>
            <div key={index}>
              {u.id !== props.userId
                ? displayUserCard({ u, setActionUser })
                : null}
            </div>
          </div>
        ))}
      </>
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
