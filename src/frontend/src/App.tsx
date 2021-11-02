import React, { useState, useEffect } from "react";
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
  Loading,
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
import apiUser from "./conf/axios.conf";

//***************************************************** */
type TParams = { username: string };

const ComponentUserConnected = ({
  match,
}: RouteComponentProps<TParams>): JSX.Element => {
  const user: string = `${match.params.username}`;
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

interface AppProps {
  isLoggedIn: boolean;
  user: User | null;
}
export interface AppState {
  auth: { isLoggedIn: boolean; user: User | null };
  users: Array<User>;
  updateUser: (b: boolean, user: User) => any;
  changeContent: (newStatus: string) => any;
  status: string;
  content: string;
}

class AppV1 extends React.Component<AppProps> {
  state: AppState;
  context = AuthContext;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      auth: {
        isLoggedIn: props.isLoggedIn,
        user: props.user,
      },
      users: [],
      updateUser: this.updateUser,
      changeContent: this.changeContent,
      status: "idle",
      content: "",
    };
  }

  changeContent = (newContent: string) => {
    this.setState({
      content: newContent,
    });
  };
  updateUser = (isLoggedIn: boolean, user: User) => {
    this.setState({
      auth: {
        isLoggedIn,
        user,
      },
    });
  };

  render() {
    // console.log("App :", this);
    return (
      <Router>
        <div className="App d-flex flex-column">
          <AuthContext.Provider value={this.state}>
            <Header />
            <div className="d-flex flex-row flex-grow-1 overflow-auto bg-dark text-light">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return this.state.auth.isLoggedIn ? (
                      <Redirect to={`/${this.state.auth.user?.username}`} />
                    ) : (
                      <Redirect to="/home" />
                    );
                  }}
                />
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

const App = () => {
  const init: User = {
    id: 0,
    username: "",
    email: "",
    img: "",
    win: 0,
    loose: 0,
    isLoggedIn: false,
    history: "",
  };
  const [isLoading, setLoading] = useState(true);
  const [fetchData, setUser] = useState(init);

  let isLoggedIn: boolean = false;
  let user: User | null = null;

  useEffect(() => {
    const loggedInToken = localStorage.getItem("token");
    const loggedInMail = localStorage.getItem("email");
    if (loggedInToken) {
      apiUser
        .post("/loginWithToken", {
          email: loggedInMail,
          token: loggedInToken,
        })
        .then((response: any) => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch((err: any) => {
          console.log("not loggin yet:", "err");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  if (fetchData) {
    if (fetchData.username) {
      user = fetchData;
      isLoggedIn = true;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return <AppV1 isLoggedIn={isLoggedIn} user={user} />;
};

export default App;
