import React, { Component } from "react";
import AuthContext from "../../context";
import { NavLink } from "react-router-dom";

interface NavLeftProps {
  username: string;
}

export default class NavLeft extends Component<NavLeftProps> {
  static contextType = AuthContext;

  render() {
    const user: string = `/${this.props.username}/`;
    const role: string = this.context.auth.user.role;

    return (
      <>
        {this.context.auth.isLoggedIn ? (
          <div className="bg-dark d-flex flex-column align-items-center justify-content-center">
            <NavLink to={`${user}rules`}>
              <i
                className="fas fa-file-alt fs-2 py-2"
                onClick={() => this.context.changeContent("rules")}
              ></i>
            </NavLink>
            <NavLink to={`${user}account`}>
              <i
                className="fas fa-user-circle fs-2 py-2"
                onClick={() => this.context.changeContent("account")}
              ></i>
            </NavLink>
            <NavLink to={`${user}contacts`}>
              <i
                className="fas fa-id-badge fs-2 py-2 "
                onClick={() => this.context.changeContent("contacts")}
              ></i>
            </NavLink>
            <NavLink to={`${user}game`}>
              <i
                className="fas fa-gamepad fs-2 py-2"
                onClick={() => this.context.changeContent("game")}
              ></i>
            </NavLink>
            <NavLink to={`${user}chats`}>
              <i
                className="fas fa-comments fs-2 py-2"
                onClick={() => this.context.changeContent("chats")}
              ></i>
            </NavLink>
            {role === "admin" ? (
              <NavLink to={`${user}superAdmin`}>
                <i
                  className="fas fa-users-cog fs-2 py-2"
                  onClick={() => this.context.changeContent("superAdmin")}
                ></i>
              </NavLink>
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
}
