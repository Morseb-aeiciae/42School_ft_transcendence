import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { apiAuth } from "../../../conf/axios.conf_auth";
import AuthContext from "../../../context";

const Auth = () => {
  let code = window.location.search;
  const context = useContext(AuthContext);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [ban, setBan] = useState(false);

  useEffect(() => {
    apiAuth
      .get(`/redirec${code}`)
      .then((response: any) => {
        setUp(true);
        // if (response.data.isBan) {
        //   setBan(true);
        // } else {
        //   setBan(false);
        context.updateToken(response.data.token.accessToken);
        context.updateUser(true, response.data.user);
        // }
      })
      .catch((err: any) => {
        setDown(true);
        console.log("Auth:", err);
      });
  }, [code, context, ban]);

  if (up) return <Redirect to="/home" />;
  else if (down) {
    return (
      <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
        <h1>Fail to connect</h1>
      </section>
    );
  } else if (ban) {
    return <section>You were ban. Contact the admin</section>;
  }
  return (
    <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
      <h1>CONNECTING ...</h1>
    </section>
  );
};

export default Auth;
