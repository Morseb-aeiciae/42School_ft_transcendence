import { useState, useEffect } from "react";
import { Loading } from "../..";
import { apiLocal3001 } from "../../../conf/axios.conf";
import ShowUserDetails from "./ShowUserDetails";

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
    return <ShowUserDetails userId={props.userId} target={showUser} />;
  } else if (users.length > 1) {
    return (
      <>
        <p>working on it</p>
        {users.map((u: any, index: number) => (
          <div key={index}>
            {u.id !== props.userId ? (
              <button
                onClick={() => {
                  setUser(u);
                }}
              >
                {u.username}
              </button>
            ) : null}
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

export default UsersRegister;
