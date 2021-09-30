import React, { Component } from "react";

export default class Chats extends Component {
  render() {
    return (
      <>
        <h1 className="border-bottom pb-3 mb-3">CHATS</h1>

        <div className="container-fluid">
          <div className="d-md">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Recipient's username"
              />
              <button
                className="btn btn-outline-secondary btn-lg"
                type="button"
              >
                Search
              </button>
            </div>
          </div>

          <div className="container">
            <h2>Chats rooms</h2>
            <div className="d-flex border bg-primary text-dark">
              <hr />
              <div className="m-2">
                <div className="bg-light rounded px-1 mb-1">chat 1</div>
                <div className="bg-light rounded px-1 mb-1">chat 2</div>
                <div className="bg-light rounded px-1 mb-1">chat 3</div>
              </div>
              <div className="flex-fill border p-2 m-1 bg-light">
                <h5>Chat 1</h5>
                <br />
                <p className="m-0">History of chat 1 ...</p>
                <p className="m-0">History of chat 1 ...</p>
                <p className="m-0">History of chat 1 ...</p>
                <p className="m-0">History of chat 1 ...</p>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Write your text here
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
