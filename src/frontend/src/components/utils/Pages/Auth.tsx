import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { apiAuth } from "../../../conf/axios.conf_auth";
import AuthContext from "../../../context";
import Loading from "../Loading";

const Auth = () => {
  let code = window.location.search;
  const context = useContext(AuthContext);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [ban, setBan] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    apiAuth
      .get(`/redirec${code}`)
      .then((response: any) => {
        setLoading(false);
        if (response.data.isBan) {
          setBan(true);
        } else {
          setUp(true);
          context.updateToken(response.data.token.accessToken);
          if (response.data.user) context.updateUser(true, response.data.user);
          else {
            context.updateUser(true, null);
          }
        }
      })
      .catch((err: any) => {
        setDown(true);
        console.log("Auth:", err);
      });
  }, [code, context, ban]);

  if (isLoading) {
    return <Loading />;
  }
  if (ban) {
    return (
      <section className="bg-dark text-light p-5 text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <h1> You were ban. Contact the admin.</h1>
        <br />
        <br />
        <img
          src="https://media.istockphoto.com/photos/error-a1089cess-denied-picture-id185278902"
          style={{ width: "600px", height: "500px" }}
        />
      </section>
    );
  } else if (up) return <Redirect to="/home" />;
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
