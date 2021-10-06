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
type TParams = { username: string };

const ComponentUserConnected = ({
  match,
}: RouteComponentProps<TParams>): JSX.Element => {
  const user: string = `${match.params.username}`;
  // console.log("App params : ", match.params);
  return (
    <>
      <NavLeft username={user} />
      <section className="p-5 text-center flex-grow-1">
        <Content username={user} />
      </section>
    </>
  );
};
//***************************************************** */

export interface AppState {
  auth: { isLoggedIn: boolean; user: User | null };
  users: Array<User>;
  login: () => any;
  logout: () => any;
  updateUser: (user: User) => any;
  updateUsers: (users: Array<User>) => any;
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
        isLoggedIn: false,
        user: null,
      },
      users: [],
      login: this.login,
      logout: this.logout,
      updateUser: this.updateUser,
      updateUsers: this.updateUsers,
      changeContent: this.changeContent,
      status: "idle",
      content: "",
    };
  }

  /******************************************************/
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       auth: { isLoggedIn: true, user: test },
  //     });
  //     // if (this.state.auth.user)
  //     //   var username: string = `${this.state.auth.user.username}`;
  //     console.log("user connected");
  //   }, 2000);
  // }
  /******************************************************/

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
  };
  changeContent = (newContent: string) => {
    this.setState({
      content: newContent,
    });
  };
  updateUser = (user: User) => {
    this.setState({ auth: { user } });
  };
  updateUsers = (users: Array<User>) => {
    this.setState(users);
  };
  render() {
    // console.log(this);

    return (
      <Router>
        <div className="App d-flex flex-column">
          <AuthContext.Provider value={this.state}>
            <Header />
            <div className="d-flex flex-row flex-grow-1 overflow-auto bg-dark text-light">
              <Switch>
                {/* <Route
                  exact
                  path="/"
                  render={() => {
                    return this.state.auth.isLoggedIn ? (
                      <Redirect to={`/${this.state.auth.user?.username}`} />
                    ) : (
                      <Redirect to="/home" />
                    );
                  }}
                /> */}
                <Route path="/home" sensitive={true} component={Home} />
                <Route path="/login" sensitive={true} component={Login} />
                <ProtectedRoute
                  path="/:username"
                  sensitive={true}
                  component={ComponentUserConnected}
                  isLoggedIn={this.state.auth.isLoggedIn}
                />
                <Route component={PageNotFound} />
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
