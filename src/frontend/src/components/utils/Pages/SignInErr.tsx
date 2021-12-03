import { Component } from "react";
import { Formik, FormikHelpers } from "formik";
import apiUsers from "../../../conf/axios.conf";
import AuthContext from "../../../context";
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

export default class SignInErr extends Component {
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

  submit = (values: any, action: FormikHelpers<any>) => {
    apiUsers
      .post("/login", values)
      .then((response: any) => {
        this.context.updateUser(true, response.data.user);
        this.context.changeRender(0);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("token", response.data.user.token);
      })
      .catch((err: any) => {
        console.log("err apiUsers:", err);
        action.setSubmitting(false);
      });
  };

  render() {
    if (!this.context.auth.isLoggedIn)
      return (
        <div className="bg-dark text-light p-5 text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <p className="text-danger">Something happened !</p>
          <p className="text-danger">
            Are you register ? If not, sign up first
          </p>
          <p className="text-danger">
            If you are register, check your password or email
          </p>
          <Formik
            onSubmit={this.submit}
            initialValues={{ email: "", password: "" }}
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
