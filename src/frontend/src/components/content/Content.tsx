import { Account, Rules, Contacts, Chats, UserPages } from ".";
import { PageNotFound } from "..";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Content = (props: any) => {
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
        <Route component={PageNotFound}></Route>
      </Switch>
    </Router>
  );
};

export default Content;
