// import React, { useContext } from "react";
import { Account, Rules, Contacts, Chats, UserPages } from ".";
import {
  PageNotFound,
  //  ProtectedRoute
} from "..";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // withRouter,
} from "react-router-dom";
// import AuthContext from "../../context";

const Content = (props: any) => {
  // const context = useContext(AuthContext);

  // let content: React.ComponentClass<any, any> | any;
  // switch (context.content) {
  //   case "account": {
  //     content = Account;
  //     break;
  //   }
  //   case "chats": {
  //     content = Chats;
  //     break;
  //   }
  //   case "contacts": {
  //     content = Contacts;
  //     // content = WithLoader(Contacts, "loaded");
  //     break;
  //   }
  //   case "rules": {
  //     content = Rules;
  //     break;
  //   }
  //   // case "game": {
  //   //   content = Game;
  //   //   break;
  //   // }
  //   default: {
  //     content = PageNotFound;
  //   }
  // }
  return (
    <Router>
      <Switch>
        <Route exact path={`/${props.username}`} component={UserPages} />
        <Route
          path={`/${props.username}/account`}
          sensitive={true}
          component={Account}
        />
        <Route
          path={`/${props.username}/chats`}
          sensitive={true}
          component={Chats}
        />
        <Route
          path={`/${props.username}/contacts`}
          sensitive={true}
          component={Contacts}
        />
        <Route
          path={`/${props.username}/rules`}
          sensitive={true}
          component={Rules}
        />
        {/* <ProtectedRoute
          path={`/${props.username}/${context.content}`}
          component={withRouter(content)}
          isLoggedIn={context.auth.isLoggedIn}
        ></ProtectedRoute> */}
        <Route component={PageNotFound}></Route>
      </Switch>
    </Router>
  );
};

export default Content;
