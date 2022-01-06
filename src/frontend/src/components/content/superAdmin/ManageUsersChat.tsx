// import { useState, useEffect } from "react";
import { useEffect } from "react";
import { apiLocal3001 } from "../../../conf/axios.conf";

const ManageUsersChat = (props: any) => {
  // const [users, setUsers] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  // const [actionUser, setActionUser] = useState({ id: -1, action: 0 });

  useEffect(() => {
    apiLocal3001
      .get("/profiles")
      .then((response: any) => {
        // setUsers(response.data);
        setTimeout(function () {
          // setLoading(false);
        }, 500);
      })
      .catch((err: any) => {
        console.log("AdminPanel:", err);
        setTimeout(function () {
          // setLoading(false);
        }, 500);
      });
  }, []);

  // useEffect(() => {
  //   if (actionUser.action) {
  //     // action = 1 => promote
  //     // action = 2 => ban
  //   }
  // }, [actionUser]);

  return (
    <section>
      <p>working on it</p>
      <p>Manage users rights on the chat NAME or ID</p>
      <p>USERS </p>
    </section>
  );
};

export default ManageUsersChat;

/*

id | users | joinned chat | role

0    xxx       true         1
1    yxx       false        0
2    yyx       true         2
3    yyy       true         2
4    zxx       false        0

*/
