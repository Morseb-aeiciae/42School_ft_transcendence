import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { apiAuth } from "../../../conf/axios.conf_auth";
import AuthContext from "../../../context";

const Auth = () => {
  let code = window.location.search;
  const context = useContext(AuthContext);
  const [up, setUp] = useState(false);

  useEffect(() => {
    apiAuth
      .get(`/redirect${code}`)
      .then((response: any) => {
        context.updateUser(true, response.data);
        setUp(true);
      })
      .catch((err: any) => {
        console.log("Auth:", err);
      });
  }, [code, context]);

  if (up) return <Redirect to="/home" />;
  return (
    <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
      <h1>CONNECTING ...</h1>
    </section>
  );
};

export default Auth;
