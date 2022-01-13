import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import TwoFA from "./Pages/TwoFA";

const ProtectedRoute = ({ component: Component, path, ...rest }: any) => {
  return (
    <Router>
      <Route
        path={path}
        render={(props) =>
          rest.auth.isLoggedIn ? (
            rest.auth.user ? (
              <Component {...props} />
            ) : (
              <TwoFA />
            )
          ) : (
            <Redirect to="/home" />
          )
        }
        key={Math.random()}
      />
    </Router>
  );
};

export default ProtectedRoute;
