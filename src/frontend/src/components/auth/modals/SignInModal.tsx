import { Component } from "react";
import { Formik } from "formik";
import apiUser from "../../../conf/axios.conf";

/**********************************************/
/*          MODAL INTERFACE                   */
/**********************************************/

const ModalHeader = () => {
  return (
    <>
      <h5 className="modal-title" id="logLabel">
        Login
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </>
  );
};

const ModalFooter = () => {
  return (
    <>
      <p>No account? Create one!</p>

      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button
        type="button"
        className="btn btn-primary"
        // if succes
        // onClick={this.context.login}
      >
        Sign in
      </button>
    </>
  );
};

const ModalBody = (submit: any) => {
  return (
    <>
      <Formik
        onSubmit={submit}
        initialValues={{ username: "", email: "", password: "" }}
      >
        {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                // if succes
                // onClick={this.context.login}
              >
                Sign in
              </button>
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

/**********************************************/
//  Testing REGISTRATION instead of login to acces back
/**********************************************/
export default class SignInModal extends Component {
  submit = (values: any, action: any) => {
    apiUser
      .post("/registration", values)
      .then((response: any) => console.log("login retrun : ", response))
      .catch((err: any) => console.log(err));
  };

  render() {
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
            <div className="modal-header">
              <ModalHeader />
            </div>
            <div className="modal-body">
              {/* <ModalBody submit={this.submit} /> */}
              <Formik
                onSubmit={this.submit}
                initialValues={{ email: "", password: "" }}
              >
                {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          name="username"
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="Email"
                          placeholder="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="Password"
                          placeholder="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                        // if succes
                        // onClick={this.context.login}
                      >
                        Sign in
                      </button>
                    </form>
                  </>
                )}
              </Formik>
            </div>
            <div className="modal-footer">
              <ModalFooter />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
