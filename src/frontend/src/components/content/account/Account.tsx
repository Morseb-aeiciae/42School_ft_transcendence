import { Component } from "react";
import { User } from "../../../Interfaces";
import AuthContext from "../../../context";

import { Formik, FormikHelpers } from "formik";
import apiUser from "../../../conf/axios.conf";
import * as Yup from "yup";
// import { Redirect } from "react-router-dom";

interface Props {}
interface ContactsState {}

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

export default class Account extends Component {
  static contextType = AuthContext;
  state: ContactsState;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

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
    apiUser
      .post("/registration", values)
      .then((response: any) => {
        // const user: User = apiUserConnecting(response.data.user);
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
    const user: User = this.context.auth.user;
    console.log(user);
    return (
      <div className="container-fluid">
        <h1 className="border-bottom  pb-3 mb-3">MY ACCOUNT</h1>
        <div className="d-flex flex-row align-items-center">
          <img
            src={
              user.img
                ? user.img
                : "https://images.unsplash.com/photo-1590474879704-135dbd7f8ffd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80"
            }
            alt="img.user"
            style={{ width: "200px", height: "200px" }}
            className="rounded-circle bg-secondary"
          />
          {/* <div className="d-flex flex-column justify-content-center align-items-start p-2 fs-3">
            <div>username : {user.username}</div>
            <div>email : {user.email}</div>
          </div> */}

          <div className="container text-lef p-2 fs-3">
            <Formik
              onSubmit={this.submit}
              initialValues={{ username: `{user.username}`, email: "" }}
              validationSchema={this.userSchema}
              validateOnChange={false}
              // isSubmitting={false}
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
                      username
                      <input
                        name="username"
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder={`${user.username}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.username && touched.username ? (
                        <div className="text-danger">{errors.username}</div>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      email
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder={`${user.email}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email ? (
                        <div className="text-danger">{errors.email}</div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </form>
                </>
              )}
            </Formik>
            {/* <div className="row">
              <div className="col align-items-start">username :</div>
              <div className="col">{user.username}</div>
              <div className="w-100"></div>
              <div className="col">email :</div>
              <div className="col">{user.email}</div>
            </div> */}
            {/* <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Edit info
                  </button> */}
          </div>
        </div>
      </div>
    );
  }
}
