import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context";
import { SignInModal } from "../auth";
import { apiAuth } from "../../conf/axios.conf_auth";
import { Loading } from "..";

const Header = () => {
  let code = window.location.pathname;
  const context = useContext(AuthContext);
  const [logout, setLogout] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (context.auth.user) setStatus(context.auth.user.status);
    else setStatus("offline");
  }, [context]);

  useEffect(() => {
    if (logout) {
      let token = localStorage.getItem("token");
      apiAuth
        .get("/logout", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response: any) => {
          localStorage.clear();
          setLogout(false);
          context.updateUser(false, null);
          context.updateToken("");
        })
        .catch((err: any) => {
          console.log("Auth:", err);
        });
    }
  }, [logout, context]);

  let path: string;
  if (context.auth.isLoggedIn) path = `/${context.auth.user?.username}/`;
  else path = "/home";

  if (logout) return <Loading />;

  return (
    <header className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href={path}>
          {/* <i className="fas fa-table-tennis fs-2 my-1"></i> */}
        </a>

        <div
          className="w-50 text-center text-light border border-4 rounded-pill fs-2"
          style={{ height: "50px" }}
        >
          {status}
        </div>
        {code === "/auth/" ? null : (
          <>
            {context.auth.isLoggedIn ? (
              <>
                <button className="btn fs-2 btn-dark text-light">
                  <i
                    className="fas fa-sign-out-alt"
                    onClick={() => {
                      setLogout(true);
                    }}
                  ></i>
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn fs-2 btn-dark text-light"
                  data-bs-toggle="modal"
                  data-bs-target="#log"
                >
                  <i className="fas fa-sign-in-alt"></i>
                </button>
              </>
            )}
            {context.auth.isLoggedIn ? null : <SignInModal />}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
