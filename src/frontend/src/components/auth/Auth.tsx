import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { apiAuth } from "../../conf/axios.conf_auth";
import AuthContext from "../../context";
import Loading from "../utils/Loading";

const Auth = () => {
  let code = window.location.search;
  const context = useContext(AuthContext);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [ban, setBan] = useState(false);
  const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     apiAuth
//       .get(`/redirec`)
//       .then((response: any) => {
//         setUp(true);
//         // if (response.data.isBan) {
//         //   setBan(true);
//         // } else {
//         //   setBan(false);
//         context.updateToken(response.data.token.accessToken);
//         context.updateUser(true, response.data.user);
//         // }
//       })
//       .catch((err: any) => {
//         setDown(true);
//         console.log("Auth:", err);
//       });
//   }, [code, context, ban]);


  useEffect(() => {
    if (!ban)
      apiAuth
        .get(`/redirec${code}`)
        .then((response: any) => {
          console.log("auth :::+ ", response.data.user);
          setLoading(false);
          if (response.data.isBan) {
            setBan(true);
          } else {
            setUp(true);
            if (response.data.user)
              context.updateUser(true, response.data.user);
            else {
              context.updateUser(true, null);
            }
            context.updateToken(response.data.token.accessToken);
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
    return <Redirect to="/ban" />;
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
