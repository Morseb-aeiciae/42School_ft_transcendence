import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context";
import { Formik, FormikHelpers } from "formik";
import { apiUser } from "../../../conf/axios.conf";
import * as Yup from "yup";
import { TwoFA } from "../../";
import { api2fa } from "../../../conf/axios.conf_2fa";
import { Redirect } from "react-router-dom";
import { apiMatch } from "../../../conf/axios.conf_match";

/******************************************/
//  Error msg from form (Yup)
/******************************************/
const errMinChar = (val: number) => {
  return `too short. minimum ${val} characters`;
};

const errMaxChar = (val: number) => {
  return `too long. maximum ${val} characters`;
};

const errEmail = () => {
  return "email address is not valid";
};

/******************************************/

const Account = () => {
  const context = useContext(AuthContext);
  const [twofa, set2fa] = useState(0);
  const [twoFA, settwoFA] = useState(false);
  const [nameUsed, setnameUsed] = useState(false);
  const [auth, setAuth] = useState("");
  const user: any = context.auth.user;
  const username = user.username;
  const email = user.email;
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    apiMatch
      .get(`getMatchsOfUser/${user.id}`)
      .then((response: any) => {
        setMatches(response.data);
      })
      .catch((err: any) => {
        console.log("history:", err);
      });
  }, [user.id]);



  const userSchema = Yup.object().shape({
    username: Yup.string().min(4, errMinChar(4)).max(10, errMaxChar(10)),
    email: Yup.string().email(errEmail).min(5, errMinChar(5)),
  });

  const submit = (values: any, action: FormikHelpers<any>) => {
    apiUser
      .post("/updateUser", {
        userId: user.id,
        email: values.email,
        image: values.image,
        username: values.username,
      })
      .then((response: any) => {
        if (response.data) {
          setnameUsed(false);
          setAuth(response.data.username);
          context.updateUser(true, response.data);
        } else if (values.username !== username) setnameUsed(true);
      })
      .catch((err: any) => {
        console.log("Err updateUser \n", err);
        action.setSubmitting(false);
      });

    action.setSubmitting(false);
  };

  useEffect(() => {
    switch (twofa) {
      case 1:
        apiUser
          .get("/turnOnTwoFa")
          .then((response: any) => {
            context.updateUser(true, null);
          })
          .catch((err: any) => {
            console.log("AdminPanel:", err);
          });
        settwoFA(true);
        break;
      case 2:
        api2fa
          .get("/turnOffTwoFa")
          .then((response: any) => {
            localStorage.setItem("token", response.data.token.accessToken);
            context.updateUser(true, response.data.user);
          })
          .catch((err: any) => {
            console.log("AdminPanel:", err);
          });
        break;
    }
    set2fa(0);
  }, [twofa, context, user]);

  if (auth) return <Redirect to={"/" + auth} />;

  if (twoFA) return <TwoFA />;
  return (
    <section>

    <div className="container-fluid">
      <h1 className="border-bottom pb-3 mb-3">MY ACCOUNT</h1>
      <p className="border-bottom pb-3 mb-3">
        {user.isTwoFactorAuthenticationEnabled ? (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => set2fa(2)}
          >
            Disable 2 factors authentication
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => set2fa(1)}
          >
            Enable 2 factors authentication
          </button>
        )}
      </p>
      <div className="d-flex flex-row align-items-center">
        <img
          src={
            user.image
              ? user.image
              : "https://images.unsplash.com/photo-1590474879704-135dbd7f8ffd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80"
          }
          alt="img.user"
          style={{ width: "200px", height: "200px" }}
          className="rounded-circle bg-secondary"
        />

        <div className="container text-lef p-2 fs-3">
          <Formik
            onSubmit={submit}
            initialValues={{ username, email, image: "" }}
            validationSchema={userSchema}
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
                  {nameUsed ? (
                    <div className="text-danger">username already used !</div>
                  ) : null}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <p className="fs-6">
                    If success editing your informations, you will be send back
                    to your home page
                  </p>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
    <div className="border-top pb-3 mb-3">

    {matches ? (
          <>
            Match history :
            {matches.map((m: any, index: number) => (
              <div
                key={index}
                className="d-flex justify-content-between container"
              >
                {m.winner_1 ? (
                  <p className="text-warning">
                    <i className="fas fa-crown"></i> {m.user_1.username}{" "}
                    {m.pts_1}
                  </p>
                ) : (
                  <p className="text-info">
                    {m.user_1.username} {m.pts_1}
                  </p>
                )}
                {m.winner_2 ? (
                  <p className="text-warning">
                    {m.user_2.username} {m.pts_2}{" "}
                    <i className="fas fa-crown"></i>
                  </p>
                ) : (
                  <p className="text-info">
                    {m.user_2.username} {m.pts_2}
                  </p>
                )}
              </div>
            ))}
          </>
        ) : (
          <p>No match played yet</p>
        )}

    </div>
    </section>
  );
};

export default Account;
