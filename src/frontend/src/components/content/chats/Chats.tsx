import React, { Component } from "react";
import AllChats from "./AllChats";
import CurrentChat from "./CurrentChat";

export default class Chats extends Component {
  render() {
    return (
      <>
        <h1 className="border-bottom pb-3 mb-3">CHATS</h1>
        {/* <div className="container-fluid"> */}
        <div className="d-md">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
            />
            <button className="btn btn-outline-secondary btn-lg" type="button">
              Search
            </button>
          </div>
        </div>
        {/* </div> */}
        <CurrentChat></CurrentChat>
        <AllChats></AllChats>
      </>
    );
  }
}
