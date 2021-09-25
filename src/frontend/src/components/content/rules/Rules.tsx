import React from "react";
import AuthContext from "../../../context";
// import { Redirect } from "react-router";
import { User } from "../../../Interfaces";

export default class Rules extends React.Component {
  static contextType = AuthContext;

  render() {
    const user: User = this.context.auth.user;
    return (
      // <>
      //   {user ? (
      //     <div>
      //       <p>Hello {user.userName} !</p>

      //       <p>Ceci sont les règles du jeu.</p>
      //     </div>
      //   ) : (
      //     <Redirect to="/home" />
      //   )}
      // </>
      <div className="container-fluid">
        <h1 className="border-bottom  pb-3 mb-3">RULES SECTION</h1>
        <p>
          Hello <span className="text-warning">{user.userName}</span>!
        </p>
        <p className="lead">Rules will be there soon !</p>
      </div>
    );
  }
}
