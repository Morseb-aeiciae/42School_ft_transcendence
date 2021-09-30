import React from "react";
import AuthContext from "../../context";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

export default class UserPages extends React.Component {
  static contextType = AuthContext;

  render() {
    console.log("UserPage context", this.context);
    const user: string = `${this.context.auth?.user?.username}`;
    return (
      <section className="">
        <Router>
          <div className="row row-cols-1 row-cols-md-3 g-4 d-flex align-items-center justify-content-center">
            <div className="col">
              <div className="card bg-light rounded-pill">
                <NavLink
                  to={"/" + user + "/rules"}
                  style={{ textDecoration: "none" }}
                  onClick={() => this.context.changeContent("rules")}
                >
                  <div className="card-body">
                    <i className="fas fa-file-alt fs-2 py-2"></i>
                    <h5 className="card-title">RULES</h5>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light rounded-pill">
                <NavLink
                  to={"/" + user + "/account"}
                  style={{ textDecoration: "none" }}
                  onClick={() => this.context.changeContent("account")}
                >
                  <div className="card-body">
                    <i className="fas fa-user-circle fs-2 py-2"></i>
                    <h5 className="card-title">ACCOUNT</h5>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light rounded-pill">
                <NavLink
                  to={"/" + user + "/contacts"}
                  style={{ textDecoration: "none" }}
                  onClick={() => this.context.changeContent("contacts")}
                >
                  <div className="card-body">
                    <i className="fas fa-id-badge fs-2 py-2 "></i>
                    <h5 className="card-title">CONTACTS</h5>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light rounded-pill">
                <NavLink
                  to={"/" + user + "/game"}
                  style={{ textDecoration: "none" }}
                  onClick={() => this.context.changeContent("game")}
                >
                  <div className="card-body">
                    <i className="fas fa-gamepad fs-2 py-2"></i>
                    <h5 className="card-title">THE GAME</h5>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light rounded-pill">
                <NavLink
                  to={"/" + user + "/chats"}
                  style={{ textDecoration: "none" }}
                  onClick={() => this.context.changeContent("chats")}
                >
                  <div className="card-body">
                    <i className="fas fa-comments fs-2 py-2"></i>
                    <h5 className="card-title">CHATS</h5>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </Router>
      </section>
    );
  }
}
