import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { apiAuth } from "../../../conf/axios.conf_auth";
import AuthContext from "../../../context";

const Auth = () => {
  let code = window.location.search;
  const context = useContext(AuthContext);
  const [up, setUp] = useState(false);
  const [down, setDowwn] = useState(false);

  console.log("k : ", window.location);
  console.log("k : ", code);

  useEffect(() => {
    apiAuth
      .get(
        `/redirec${code}`
        // , {
        // .get(`/redirect`, {
        //   headers: {
        //     Authorization: "Bearer " + code.slice(6, code.length),
        //   },
        // }
      )
      .then((response: any) => {
        console.log("test", response);
        setUp(true);
        context.updateToken(response.data.token);
        context.updateUser(true, response.data.user);
      })
      .catch((err: any) => {
        setDowwn(true);
        console.log("Auth:", err);
      });
  }, [code, context]);

  if (up) return <Redirect to="/home" />;
  else if (down) {
    return (
      <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
        <h1>Fail to connect</h1>
      </section>
    );
  }
  return (
    <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
      <h1>CONNECTING ...</h1>
    </section>
  );
};

export default Auth;
