import React, { Component } from "react";
import ContactElements from "./ContactElements";
import { User } from "../../../Interfaces";
import { Loading } from "../..";

/********************/
import Data from "../../../#Test/Data";
/********************/

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

    /******************************************************/
    // setTimeout(() => {
    //   this.setState({
    //     contacts: Data,
    //     loaded: true,
    //   });
    // }, 1000);
    /******************************************************/
  }

  componentDidMount() {
    console.log("apiContact");
  }

  deleteContact = (index: number) => {
    console.log("deleteContact, index:", index);
    const contacts = [...this.state.contacts];
    contacts.splice(index, 1);
    this.setState({ contacts }, () => {
      console.log("Need to delete contact from db ?");
    });
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
