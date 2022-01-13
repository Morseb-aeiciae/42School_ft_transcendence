import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { api2fa } from "../../../conf/axios.conf_2fa";
import AuthContext from "../../../context";
import { Formik } from "formik";
import Loading from "../Loading";

const TwoFA = () => {
  const context = useContext(AuthContext);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [QR, setQR] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api2fa
      .post("/generate")
      .then((response: any) => {
        const otpauth = response.data;
        const QRCode = `https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${otpauth}`;
        setQR(QRCode);
        setLoading(false);
      })
      .catch((err: any) => {
        setDown(true);
        setLoading(false);
        console.log("Auth:", err);
      });
  }, []);

  const submit = (values: any, action: any) => {
    api2fa
      .post("/authenticate", values)
      .then((response: any) => {
        context.updateToken(response.data.accessToken.accessToken);
        context.updateUser(true, response.user);
        setUp(true);
      })
      .catch((err: any) => {
        console.log("Submit 2fa err :", err);
        action.setSubmitting(false);
      });
  };
  console.log("context :::", context);

  if (isLoading) {
    return <Loading />;
  }
  if (up) return <Redirect to="/home" />;
  else if (down) {
    return (
      <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
        <h1>Fail to connect</h1>
      </section>
    );
  } else if (QR) {
    return (
      <section>
        You have the 2fa activated, auth with QR code :
        <br />
        <img
          src={QR}
          alt="QR Code"
          style={{ width: "200px", height: "200px" }}
        />
        <p>{QR}</p>
        <p>Enter you code from QR Code down here :</p>
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
      </section>
    );
  }
  return (
    <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
      <h1>CONNECTING ...</h1>
    </section>
  );
};
export default TwoFA;
