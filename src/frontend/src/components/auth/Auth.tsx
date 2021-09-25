import AuthContext from "../../context";
import React, { Component } from "react";
// import * as axios from "axios";
import { SignInModal, SignOutModal } from "./modals";

export default class Auth extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   .then((response: any) => response.data)
    //   .then((users: any) => this.setState({ users }))
    //   .catch((err: any) => console.log(err));
  }
  render() {
    return <>{this.context.auth.isLoggedIn ? SignOutModal() : SignInModal()}</>;
  }
}
