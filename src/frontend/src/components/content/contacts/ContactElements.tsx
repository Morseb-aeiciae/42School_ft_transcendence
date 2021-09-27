import React, { Component } from "react";
import { User } from "../../../Interfaces";

interface Props {
  contact: User;
  // deleteContact: (index: number) => void;
  // deleteContact: (index: number) => Event;
  // deleteContact: (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => void;
  deleteContact: (...args: any[]) => any;
}

export default class ContactElements extends Component<Props> {
  render() {
    return (
      <>
        <div className="d-flex flex-row flex-wrap align-content-start">
          <div className="p-2">
            <div className="border">
              <h4 className="text-center">{this.props.contact.username}</h4>
              <div>
                <img
                  max-width="150"
                  max-height="200"
                  className="d-block mx-auto"
                  src={this.props.contact.img}
                  alt="user-name"
                />
              </div>
              <p className="text-center">History</p>
              <p className="text-center">
                <i className="fas fa-trophy"></i> {this.props.contact.win}
              </p>
              <p className="text-center">
                <i className="fas fa-times-circle"></i>{" "}
                {this.props.contact.loose}
              </p>
              <button>whisper</button>
              <button>challenge</button>
              <button
                className="btn btn-small btn-danger"
                onClick={this.props.deleteContact}
              >
                remove
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
