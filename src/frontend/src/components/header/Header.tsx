import React, { Component } from "react";
import Status from "./Status";
import AuthContext from "../../context";
import { Auth } from "../";

export default class Header extends Component {
  static contextType = AuthContext;

  render() {
    let path: string;
    if (this.context.auth.isLoggedIn)
      path = "/" + this.context.auth.user.userName;
    else path = "/home";
    return (
      // <header className="navbar navbar-expand-lg navbar-light bg-dark navbar-dark d-flex justify-content-between">
      <header className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href={path}>
            <i className="fas fa-table-tennis fs-2 my-1"></i>
          </a>

          <div
            className="w-50 text-center text-light border border-4 rounded-pill fs-2"
            style={{ height: "50px" }}
          >
            <Status />
          </div>

          {/* <div className="bg-secondary min-vw-25">
            {this.context.auth.isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={this.context.logout}
                  style={{ width: "150px" }}
                >
                  Deconnexion
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={this.context.login}
                  style={{ width: "150px" }}
                >
                  Connexion
                </button>
              </>
            )}
          </div> */}
          <button
            className="btn fs-2 btn-dark text-light"
            data-bs-toggle="modal"
            data-bs-target="#log"
          >
            {this.context.auth.isLoggedIn ? (
              <>
                <i
                  className="fas fa-sign-out-alt"
                  onClick={this.context.logout}
                ></i>
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
              </>
            )}
          </button>

          <Auth />

          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse text-center" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  1 - First Link
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  2 - Second Link
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  3 - Third Link
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </header>
    );
  }
}
