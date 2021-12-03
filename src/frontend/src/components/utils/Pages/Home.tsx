import { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../../context";

const Home = () => {
  const context = useContext(AuthContext);
  if (!context.auth.isLoggedIn)
    return (
      <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
        <h1>THIS IS HOME</h1>
        <a href="http://localhost/login">Sign up Now ! </a>
      </section>
    );
  else return <Redirect to={`/${context.auth.user?.username}`} />;
};

export default Home;
