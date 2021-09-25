import React, { Component } from "react";
import ContactElements from "./ContactElements";
import { User } from "../../../Interfaces";
import { Loading } from "../..";

interface Props {
  contacts: User[];
  loaded: boolean;
}
interface ContactsState {
  contacts: Array<User>;
  loaded: boolean;
}

export default class Contacts extends Component {
  state: ContactsState;

  constructor(props: Props) {
    super(props);
    this.state = {
      contacts: [],
      loaded: false,
    };

    /*
     **  TO DELETE WHEN THE DB IS UP
     ** setTimeout function
     ** after 1 sec loading data - Test ok
     ** (need to be test when db is linked)
     */

    /******************************************************/
    setTimeout(() => {
      this.setState({
        contacts: [
          {
            id: 0,
            userName: "user-name-0",
            img: "https://randomuser.me/api/portraits/men/89.jpg",
            win: 1,
            loose: 0,
            isLoggedIn: false,
          },
          {
            id: 1,
            userName: "user-name-1",
            img: "https://randomuser.me/api/portraits/women/19.jpg",
            win: 4,
            loose: 3,
            isLoggedIn: true,
          },
          {
            id: 2,
            userName: "user-name-2",
            img: "https://randomuser.me/api/portraits/women/9.jpg",
            win: 4,
            loose: 3,
            isLoggedIn: true,
          },
          {
            id: 0,
            userName: "user-name-3",
            img: "https://randomuser.me/api/portraits/men/9.jpg",
            win: 1,
            loose: 0,
            isLoggedIn: false,
          },
          {
            id: 0,
            userName: "user-name-0",
            img: "https://randomuser.me/api/portraits/men/8.jpg",
            win: 1,
            loose: 0,
            isLoggedIn: false,
          },
          {
            id: 1,
            userName: "user-name-1",
            img: "https://randomuser.me/api/portraits/women/1.jpg",
            win: 4,
            loose: 3,
            isLoggedIn: true,
          },
        ],
        loaded: true,
      });
    }, 1000);
    /******************************************************/
  }

  deleteContact = (index: number) => {
    console.log("deleteContact, index:", index);
    const contacts = [...this.state.contacts];
    contacts.splice(index, 1);
    this.setState({ contacts });
  };

  render() {
    return (
      <>
        <h1 className="border-bottom">CONTACTS</h1>
        <div className="container">
          {this.state.loaded ? (
            <div>
              <div className="row g-4">
                {this.state.contacts.map((contact: User, index: number) => (
                  <>
                    <div className="col-md-6 col-lg-3">
                      <ContactElements
                        key={contact.id}
                        contact={contact}
                        deleteContact={(index: number) =>
                          this.deleteContact(index)
                        }
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </>
    );
  }
}
