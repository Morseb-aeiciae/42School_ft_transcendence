import { useContext, useEffect, useState } from "react";
import Status from "./Status";
import AuthContext from "../../context";
import { SignInModal, SignOutModal } from "../auth";
import { apiAuth } from "../../conf/axios.conf_auth";

const Header = () => {
  const context = useContext(AuthContext);
  const [logout, setLogout] = useState(false);
  const [r, setR] = useState(false);

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
          setTimeout(() => {
            context.updateToken("");
          }, 200);
        })
        .catch((err: any) => {
          console.log("Auth:", err);
        });
    }
  }, [logout, context]);

  let path: string;
  if (context.auth.isLoggedIn) path = `/${context.auth.user?.username}/`;
  else path = "/home";
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
          <Status />
        </div>

        <button
          className="btn fs-2 btn-dark text-light"
          data-bs-toggle="modal"
          data-bs-target="#log"
        >
          {context.auth.isLoggedIn ? (
            <>
              <i
                className="fas fa-sign-out-alt"
                onClick={() => {
                  setLogout(true);
                }}
              ></i>
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt"></i>
            </>
          )}
        </button>
        {context.auth.isLoggedIn ? <SignOutModal /> : <SignInModal />}
      </div>
    </header>
  );
};

export default Header;
