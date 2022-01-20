import { useContext, useState } from "react";
import { api2fa } from "../../conf/axios.conf_2fa";
import AuthContext from "../../context";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";

const TwoFA = () => {
  const context = useContext(AuthContext);
  const [QR, setQR] = useState("");
  const [auth, setAuth] = useState("");
  const [ErrAuth, setErrAuth] = useState(false);
  const [ErrQR, setErrQR] = useState(false);

  const submitG = (values: any, action: any) => {
    api2fa
      .post("/generate")
      .then((response: any) => {
        const otpauth = response.data;
        const QRCode = `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${otpauth}`;
        setQR(QRCode);
      })
      .catch((err: any) => {
        setErrQR(true);
        console.log("Auth:", err);
      });
  };

  const submit = (values: any, action: any) => {
    api2fa
      .post("/authenticate", values)
      .then((response: any) => {
        const user = response.data.user;
        setAuth(user.username);
        context.updateUser(true, user);
        context.updateToken(response.data.accessToken.accessToken);
      })
      .catch((err: any) => {
        setErrAuth(true);
        action.setSubmitting(false);
      });
  };

  if (auth) return <Redirect to={"/" + auth} />;

  return (
    <section className="bg-dark text-light p-5 text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      You have the 2fa activated, auth with QR code :
      <br />
      <>
        <p></p>
        <p>You need the Google Authenticator app</p>
        <p></p>
        <p>
          If it's your first time, generate a QRCode. Then scan it with the
          Google Authenticator app
          <br /> If you have already scan a QR code, launch the app and type the
          code
        </p>
        <p></p>
        <Formik
          onSubmit={submitG}
          initialValues={{ twoFactorAuthenticationCode: "" }}
        >
          {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
            <form
              className="d-flex flex-column flex-fill m-2"
              onSubmit={handleSubmit}
            >
              <div className="d-flex flex-row p-1">
                <button
                  className="btn btn-outline-secondary btn-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Generate
                </button>
              </div>
            </form>
          )}
        </Formik>
        {QR ? (
          <>
            <img src={QR} alt="img" />
            <p></p>
          </>
        ) : null}
        {ErrQR ? (
          <>
            <img
              src="https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="img.user"
              style={{ width: "200px", height: "200px" }}
              className="rounded-circle bg-secondary"
            />
            <p>QR couldn't be generate. Contact webmaster</p>
          </>
        ) : null}
        <p></p>
        <p>Enter you code from QR Code down here :</p>
        {ErrAuth ? <p className="text-danger">Wrong input</p> : null}
        <Formik
          onSubmit={submit}
          initialValues={{ twoFactorAuthenticationCode: "" }}
        >
          {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
            <form
              className="d-flex flex-column flex-fill m-2"
              onSubmit={handleSubmit}
            >
              <div className="d-flex flex-row p-1">
                <div className="d-flex flex-row flex-grow-1 align-items-end justify-content-evenly">
                  <input
                    id="twoFactorAuthenticationCode"
                    name="twoFactorAuthenticationCode"
                    className="flex-fill form-control mr-2"
                    placeholder="QR code ..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <button
                  className="btn btn-outline-secondary btn-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </Formik>
      </>
    </section>
  );
};
export default TwoFA;
