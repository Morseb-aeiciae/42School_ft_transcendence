import React, { Component } from "react";
import { Account, Rules, Contacts, Chats, UserPages } from ".";
import { PageNotFound, ProtectedRoute } from "..";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContext from "../../context";

interface ContentProps {
  userName: string;
}

export default class Content extends Component<ContentProps> {
  static contextType = AuthContext;

  render() {
    let content: React.ComponentClass<any, any>;
    console.log(this.context.content);

    switch (this.context.content) {
      case "account": {
        content = Account;
        break;
      }
      case "chats": {
        content = Chats;
        break;
      }
      case "contacts": {
        content = Contacts;
        // content = WithLoader(Contacts, "loaded");
        break;
      }
      case "rules": {
        content = Rules;
        break;
      }
      // case "game": {
      //   content = Game;
      //   break;
      // }
      default: {
        content = PageNotFound;
      }
    }
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={"/" + `${this.props.userName}`}
            component={UserPages}
          />
          <ProtectedRoute
            path={
              "/" + `${this.props.userName}` + "/" + `${this.context.content}`
            }
            component={content}
            isLoggedIn={this.context.auth.isLoggedIn}
          ></ProtectedRoute>
          <Route component={PageNotFound}></Route>
        </Switch>
      </Router>
    );
  }
}
