import React, { Component } from "react";
import { User } from "../../../Interfaces";
import AuthContext from "../../../context";
// import { Redirect } from "react-router";

interface Props {}
interface ContactsState {}

export default class Account extends Component {
  static contextType = AuthContext;
  state: ContactsState;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const user: User = this.context.auth.user;
    return (
      <>
        <h1 className="border-bottom  pb-3 mb-3">MY ACCOUNT</h1>
        <div>
          <img
            src={user.img}
            alt="img.user"
            style={{ width: "200px", height: "200px" }}
            className="rounded-circle"
          />
          <div>{user.username}</div>
        </div>
      </>
    );
  }
}

/*
        {user ? (
          <div>
            <img src={user.img} alt="img.user" />
            <div>{user.username}</div>
          </div>
        ) : (
          <Redirect to="/home" />
        )}
*/
