import { useEffect, useState } from "react";
import { apiAuth } from "../../conf/axios.conf_auth";

const SignInModal = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (login) {
      apiAuth
        .get("/login")
        .then((response: any) => {
          window.location.href = response.data;
        })
        .catch((err: any) => {
          console.log("Login:", err);
        });
    }
  }, [login]);

  return (
    <div
      className="modal fade"
      id="log"
      tabIndex={-1}
      aria-labelledby="logLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => {
              setLogin(true);
            }}
          >
            42 Api
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
