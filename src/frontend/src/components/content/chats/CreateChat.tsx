import { Component } from "react";
import AuthContext from "../../../context";

import { Formik } from "formik";
import { apiChat } from "../../../conf/axios.conf_chats";
import * as Yup from "yup";

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

/******************************************/
interface Props {
  [name: string]: any;
}

export default class CreateChat extends Component<Props> {
  static contextType = AuthContext;
  userSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, errMinChar(2))
      .max(10, errMaxChar(10))
      .required(errRequired),
    password: Yup.string().min(2, errMinChar(2)).max(10, errMaxChar(10)),
  });

  submit = (values: any, action: any) => {
    const setState = this.props.props;
    apiChat
      .post("/createChat", values)
      .then(() => {
        action.setSubmitting(false);
        setTimeout(function () {
          setState(Math.random());
        }, 100);
      })
      .catch((err: any) => {
        console.log("creating chats", err);
      });
  };

  render() {
    const userId = this.context.auth.user.id;
    return (
      <Formik
        onSubmit={this.submit}
        initialValues={{ name: "", password: undefined, ownerId: userId }}
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
          <form
            className="d-flex flex-column flex-fill m-2"
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-row p-1">
              <input
                name="name"
                className="flex-fill form-control mr-2"
                id="name"
                placeholder="Create a chat ..."
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <div className="text-danger">{errors.name}</div>
              ) : null}
              {/* <select
                name="type"
                className="mr-2 form-control w-25"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select> */}
            </div>
            <div className="d-flex flex-row p-1">
              <div className="d-flex flex-row flex-grow-1 align-items-end justify-content-evenly">
                <input
                  id="password"
                  name="password"
                  className="flex-fill form-control mr-2"
                  placeholder="Password (optional) ..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </div>
              <button
                className="btn btn-outline-secondary btn-lg"
                type="submit"
                disabled={isSubmitting}
              >
                Create
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
