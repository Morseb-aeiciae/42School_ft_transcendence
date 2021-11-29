import { Component } from "react";
import { User } from "../../../Interfaces";
import AuthContext from "../../../context";
import { Formik, FormikHelpers } from "formik";
import apiUsers, { apiUser } from "../../../conf/axios.conf";
import * as Yup from "yup";

interface Props {}
interface ContactsState {
  wrongPwd: boolean;
}

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
  return "password required to edit personnal informations";
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
    this.state = {
      wrongPwd: false,
    };
  }

  userSchema = Yup.object().shape({
    username: Yup.string().min(4, errMinChar(4)).max(10, errMaxChar(10)),
    // .required(errRequired),
    email: Yup.string().email(errEmail).min(5, errMinChar(5)),
    // .required(errRequired),
    password: Yup.string()
      .min(8, errMinChar(8))
      .max(25, errMaxChar(25))
      .required(errRequired),
  });

  submit = (values: any, action: FormikHelpers<any>) => {
    const user: User = this.context.auth.user;
    const email = user.email;
    console.log("log :class Account:", { userId: user.id, ...values });

    /*

          .post("/updateUser", { userId: user.id, ...values })

          .post("/updateUser", {
            userId: user.id,
            email: values.email,
            image: values.image,
            username: values.username,
          })
*/
    apiUsers
      .post("/login", { email, password: values.password })
      .then((response: any) => {
        this.setState({
          wrongPwd: false,
        });
        apiUser
          .post("/updateUser", {
            userId: user.id,
            email: values.email,
            image: values.image,
            username: values.username,
          })
          .then((response: any) => {
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("token", response.data.password);
            this.context.updateUser(true, response.data);
          })
          .catch((err: any) => {
            console.log("Err updateUser \n", err);
            action.setSubmitting(false);
          });

        action.setSubmitting(false);
      })
      .catch((err: any) => {
        console.log("Err auth \n", err);
        this.setState({
          wrongPwd: true,
        });
        action.setSubmitting(false);
      });
  };

  render() {
    const user: User = this.context.auth.user;
    const username = user.username;
    const email = user.email;

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

          <div className="container text-lef p-2 fs-3">
            <Formik
              onSubmit={this.submit}
              initialValues={{ username, email, image: "", password: "" }}
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

                    <div className="mb-3">
                      image
                      <input
                        name="image"
                        type="text"
                        className="form-control"
                        id="image"
                        placeholder={"link adress to an image"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.image && touched.image ? (
                        <div className="text-danger">{errors.image}</div>
                      ) : null}
                    </div>

                    <p className="border-bottom pb-3 mb-3"></p>

                    <div className="mb-3">
                      password
                      <input
                        name="password"
                        type="text"
                        className="form-control"
                        id="password"
                        placeholder={"password needed to edit"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password ? (
                        <div className="text-danger">{errors.password}</div>
                      ) : null}
                    </div>
                    {this.state.wrongPwd ? (
                      <p className="text-danger">Wrong password</p>
                    ) : null}
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
          </div>
        </div>
      </div>
    );
  }
}
