import { Component } from "react";
import ContactElements from "./ContactElements";
import { User } from "../../../Interfaces";
import { Loading } from "../..";
import UsersRegister from "./UsersRegister";
import AuthContext from "../../../context";

interface Props {}
interface ContactsState {
  contacts: Array<User>;
  loaded: boolean;
  display: number;
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
    };
  }

  updateLoaded = (loaded: boolean) => {
    this.setState({
      loaded,
    });
  };

  componentDidMount() {
    this.updateLoaded(true);
    // console.log("apiContact");
  }

  deleteContact = (index: number) => {
    // console.log("deleteContact, index:", index);
    const contacts = [...this.state.contacts];
    contacts.splice(index, 1);
    this.setState({ contacts }, () => {
      // console.log("Need to delete contact from db ?");
    });
  };

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
              ) : (
                <h1 className="text-light p-5 text-center">No contact yet</h1>
              )
            ) : (
              <Loading />
            )}
          </div>
        </>
      );
  }
}
