import { useContext, useEffect, useState } from "react";
import ContactElements from "./ContactElements";
import { User } from "../../../Interfaces";
import { Loading } from "../..";
import UsersRegister from "./UsersRegister";
import AuthContext from "../../../context";
import { apiFriends } from "../../../conf/axios.conf_friends";

const Contacts = () => {
  const context = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [display, setDisplay] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(0);
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
    return <UsersRegister userId={user} />;
  } else
    return (
      <>
        <h1 className="border-bottom">CONTACTS</h1>
        <button onClick={() => setDisplay(1)}>Looking for people</button>
        <p className="border-bottom"></p>
        <div key={Math.random()} className="container">
          {isLoading ? (
            contacts.length ? (
              <div className="row g-4">
                {contacts.map((contact: User, index: number) => (
                  <>
                    <div className="col-md-6 col-lg-3">
                      <ContactElements
                        key={index}
                        userId={user}
                        target={contact}
                        setRefresh={setRefresh}
                      />
                    </div>
                  </>
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

/*

import { Component } from "react";
import ContactElements from "./ContactElements";
import { User } from "../../../Interfaces";
import { Loading } from "../..";
import UsersRegister from "./UsersRegister";
import AuthContext from "../../../context";
import { apiFriends } from "../../../conf/axios.conf_chats copy";

interface Props {}
interface ContactsState {
  contacts: Array<User>;
  loaded: boolean;
  display: number;
  refresh: number;
}

export default class Contacts extends Component {
  state: ContactsState;
  static contextType = AuthContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      contacts: [],
      loaded: false,
      display: 0,
      refresh: 0,
    };
  }

  updateLoaded = (loaded: boolean) => {
    this.setState({
      loaded,
    });
  };

  componentDidMount() {
    apiFriends
      .get(`getListOfFriends/${this.context.auth.user.id}`)
      .then((response: any) => {
        const contacts = response.data;
        this.setState({
          contacts,
        });
        this.updateLoaded(true);
      })
      .catch((err: any) => {
        console.log("Friends Details :", err);
      });
  }

  render() {
    if (this.state.display === 1) {
      return <UsersRegister userId={this.context.auth.user.id} />;
    } else
      return (
        <>
          <h1 className="border-bottom">CONTACTS</h1>
          <button onClick={() => this.setState({ display: 1 })}>
            Looking for people
          </button>
          <p className="border-bottom"></p>
          <div className="container">
            {this.state.loaded ? (
              this.state.contacts.length ? (
                <div className="row g-4">
                  {this.state.contacts.map((contact: User, index: number) => (
                    <>
                      <div className="col-md-6 col-lg-3">
                        <ContactElements
                          key={index}
                          userId={this.context.auth.user.id}
                          target={contact}
                          refresh={this.state.refresh}
                        />
                      </div>
                    </>
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
  }
}
*/
