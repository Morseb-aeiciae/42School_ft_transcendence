import { Component } from "react";
import { Formik, FormikHelpers } from "formik";
// import apiUsers, { apiUsersConnecting } from "../../../conf/axios.conf";
import apiUsers from "../../../conf/axios.conf";
import AuthContext from "../../../context";
// import { User } from "../../../Interfaces";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

/******************************************/
//  Error msg from form (Yup)
/******************************************/
const errMinChar = (val: number) => {
  return `too short. minimum ${val} characters`;
};

const errMaxChar = (val: number) => {
  return `too long. maximum ${val} characters`;
};
const errRequired = () => {
  return "required";
};

const errEmail = () => {
  return "email address is not valid";
};

/******************************************/

export default class Login extends Component {
  static contextType = AuthContext;

  userSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, errMinChar(4))
      .max(10, errMaxChar(10))
      .required(errRequired),
    email: Yup.string()
      .email(errEmail)
      .min(5, errMinChar(5))
      .required(errRequired),
    password: Yup.string()
      .min(8, errMinChar(8))
      .max(25, errMaxChar(25))
      .required(errRequired),
  });

  // onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;
  submit = (values: any, action: FormikHelpers<any>) => {
    apiUsers
      .post("/registration", values)
      .then((response: any) => {
        // const user: User = apiUsersConnecting(response.data.user);
        // this.context.updateUser(true, user);
        this.context.updateUser(true, response.data.user);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("token", response.data.user.token);
      })
      .catch((err: any) => {
        console.log("Err login \n", err);
        action.setSubmitting(false);
      });
  };

  render() {
    if (!this.context.auth.isLoggedIn)
      return (
        <div className="bg-dark text-light p-5 text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <Formik
            onSubmit={this.submit}
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={this.userSchema}
            validateOnChange={false}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              errors,
              touched,
            }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      name="username"
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.username && touched.username ? (
                      <div className="text-danger">{errors.username}</div>
                    ) : null}
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
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
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
                    {errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Sign in
                  </button>
                </form>
              </>
            )}
          </Formik>
        </div>
      );
    else return <Redirect to={`/${this.context.auth.user?.username}`} />;
  }
}
