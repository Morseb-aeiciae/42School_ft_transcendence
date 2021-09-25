import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import {
  Header,
  Footer,
  Content,
  NavLeft,
  Home,
  Login,
  PageNotFound,
  ProtectedRoute,
} from "./components";
import AuthContext from "./context";
import { User } from "./Interfaces";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import test from "./#Test/User";

//***************************************************** */
interface AppProps {}
type TParams = { userName: string };

const ComponentUserConnected = ({
  match,
}: RouteComponentProps<TParams>): JSX.Element => {
  const user: string = `${match.params.userName}`;
  return (
    <>
      <NavLeft userName={user} />
      <section className="p-5 text-center flex-grow-1">
        <Content userName={user} />
      </section>
    </>
  );
};
//***************************************************** */

export interface AppState {
  auth: { isLoggedIn: boolean; user: User | null };
  login: () => any;
  logout: () => any;
  changeContent: (newStatus: string) => any;
  status: string;
  content: string;
}

class App extends React.Component<AppProps> {
  state: AppState;
  context = AuthContext;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      auth: {
        isLoggedIn: true,
        // user: null,
        user: test,
      },
      login: this.login,
      logout: this.logout,
      changeContent: this.changeContent,
      status: "idle",
      content: "account",
    };
  }

  login = () => {
    this.setState({
      auth: {
        isLoggedIn: true,
      },
    });
  };
  logout = () => {
    this.setState({
      auth: {
        isLoggedIn: false,
      },
    });
    // <Redirect to="/home" />;
  };
  changeContent = (newContent: string) => {
    this.setState({
      content: newContent,
    });
  };

  render() {
    return (
      <Router>
        <div className="App d-flex flex-column">
          <AuthContext.Provider value={this.state}>
            <Header />
            <div className="d-flex flex-row flex-grow-1 overflow-auto bg-dark text-light">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" sensitive={true} component={Home} />
                <Route path="/login" sensitive={true} component={Login} />
                <ProtectedRoute
                  path="/:userName"
                  sensitive={true}
                  component={ComponentUserConnected}
                  isLoggedIn={this.state.auth.isLoggedIn}
                ></ProtectedRoute>
                <Route component={PageNotFound}></Route>
              </Switch>
            </div>
            <Footer />
          </AuthContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
