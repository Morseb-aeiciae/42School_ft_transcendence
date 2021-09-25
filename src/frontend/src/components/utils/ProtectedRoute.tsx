import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, path, ...rest }: any) => {
  return (
    <Router>
      <Route
        path={path}
        render={(props) =>
          rest.isLoggedIn ? <Component {...props} /> : <Redirect to="/home" />
        }
        key={Math.random()}
      />
    </Router>
  );
};

export default ProtectedRoute;
