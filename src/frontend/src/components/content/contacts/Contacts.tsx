import { useContext, useEffect, useState } from "react";
import ContactElements from "./ContactElements";
import { User } from "../../../Interfaces";
import { Loading } from "../..";
import UsersRegister from "./UsersRegister";
import AuthContext from "../../../context";
import { apiFriends } from "../../../conf/axios.conf_friends";
import PrivateMsg from "./PrivateMsg";
import Duel from "./Duel";

const Contacts = () => {
  const context = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [display, setDisplay] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [target, setTarget] = useState({
    id: 0,
  });
  const user = context.auth.user?.id;

  useEffect(() => {
    apiFriends
      .get(`getListOfFriends/${user}`)
      .then((response: any) => {
        const contacts = response.data;

        setContacts(contacts);
        setLoading(true);
      })
      .catch((err: any) => {
        console.log("Friends Details :", err);
      });
  }, [refresh, user]);

  if (display === 1) {
    return <UsersRegister userId={user} setDisplay={setDisplay} setTarget={setTarget}/>;
  } else if (display === 2) {
    return <PrivateMsg targetId={target} userId={user} />;
  } else if (display === 3) {
    return <Duel targetId={target} userId={user} />;
  }
  return (
    <>
      <h1 className="border-bottom">CONTACTS</h1>
      <button onClick={() => setDisplay(1)}>Looking for people</button>
      <p className="border-bottom"></p>
      <div className="container">
        {isLoading ? (
          contacts.length ? (
            <div className="row g-4">
              {contacts.map((contact: User, index: number) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <ContactElements
                    userId={user}
                    target={contact}
                    setDisplay={setDisplay}
                    setTarget={setTarget}
                    setRefresh={setRefresh}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-light p-5 text-center" key={0}>
              No contact yet
            </h1>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Contacts;
