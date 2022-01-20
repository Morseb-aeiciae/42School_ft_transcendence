import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import {
  Header,
  Footer,
  Content,
  NavLeft,
  Home,
  PageNotFound,
  ProtectedRoute,
  Loading,
  Auth,
  TwoFA,
  Ban,
} from "./components";
import AuthContext from "./context";
import { User } from "./Interfaces";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { apiUser } from "./conf/axios.conf";
//***************************************************** */
type TParams = { username: string };

const ComponentUserConnected = ({
  match,
}: RouteComponentProps<TParams>): JSX.Element => {
  const context = useContext(AuthContext);
  let user;
  if (context.auth.user) user = context.auth.user?.username;
  else user = `${match.params.username}`;

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
  updateUser: (b: boolean, user: User | null) => any;
  content: string;
  changeContent: (newContent: string) => any;
  token: string;
  updateToken: (token: string) => any;
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
      content: "",
      changeContent: this.changeContent,
      token: "",
      updateToken: this.updateToken,
    };
  }

  updateToken = (token: string) => {
    localStorage.setItem("token", token);
    this.setState({
      token,
    });
  };
  changeContent = (newContent: string) => {
    this.setState({
      content: newContent,
    });
  };
  changeRender = (render: number) => {
    this.setState({
      switchRender: render,
    });
  };
  updateUser = (isLoggedIn: boolean, user: User | null) => {
    this.setState({
      auth: {
        isLoggedIn,
        user,
      },
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
                <Route path="/auth" sensitive={true} component={Auth} />
                <Route path="/2fa" sensitive={true} component={TwoFA} />
                <Route path="/ban" sensitive={true} component={Ban} />
                <ProtectedRoute
                  path="/:username"
                  sensitive={true}
                  component={withRouter(ComponentUserConnected)}
                  auth={this.state.auth}
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
    id: -1,
    username: "",
    email: "",
    img: "",
    win: 0,
    loose: 0,
    isLoggedIn: false,
    history: "",
  };
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLog] = useState(false);
  const [fetchData, setData] = useState(init);

  let user: User | null = null;
  useEffect(() => {
    const loggedInToken = localStorage.getItem("token");

    if (loggedInToken) {
      apiUser
        .get("/findUserToken")
        .then((response: any) => {
          setLog(true);
          setData(response.data);
          setTimeout(function () {
            setLoading(false);
          }, 100);
        })
        .catch((err: any) => {
          localStorage.clear();
          setLog(false);
          setTimeout(function () {
            setLoading(false);
          }, 100);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (isLoggedIn) {
    user = fetchData;
  } else {
    user = null;
  }

  if (isLoading) {
    return <Loading />;
  }
  return <AppV1 isLoggedIn={isLoggedIn} user={user} />;
};

export default App;
