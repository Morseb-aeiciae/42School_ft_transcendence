import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../../context";

export default class Home extends Component {
  static contextType = AuthContext;

  render() {
    if (!this.context.auth.isLoggedIn)
      return (
        <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
          <h1>THIS IS HOME</h1>
          <p>Sign up Now !</p>
        </section>
      );
    else return <Redirect to={`/${this.context.auth.user?.username}`} />;
  }
}
