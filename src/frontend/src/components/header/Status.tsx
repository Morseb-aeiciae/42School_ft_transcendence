import React, { Component } from "react";
import AuthContext from "../../context";

interface Props {}

export default class Header extends Component<Props> {
  static contextType = AuthContext;

  render() {
    let content: JSX.Element | React.ComponentClass;

    switch (this.context.status) {
      case "noConnected": {
        content = <div>noConnected</div>;
        break;
      }
      case "idle": {
        content = <div>idle</div>;
        break;
      }
      case "lookingForGame": {
        content = <div>lookingForGame</div>;
        break;
      }
      case "playing": {
        content = <div>playing</div>;
        break;
      }
      default: {
        content = <div>noConnected</div>;
      }
    }

    return <div>{content}</div>;
  }
}
