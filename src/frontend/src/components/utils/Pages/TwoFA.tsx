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
        console.log(QRCode);

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
  // console.log("context :::", context);

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
  } else {
    return (
      <section className="bg-dark text-light p-5 text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        You have the 2fa activated, auth with QR code :
        <br />
        {QR ? (
          <>
            <img
              src={QR}
              alt="img.user"
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
          </>
        ) : (
          <>
            <img
              src="https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="img.user"
              style={{ width: "200px", height: "200px" }}
              className="rounded-circle bg-secondary"
            />
            <p>QR couldn't be load</p>
          </>
        )}
      </section>
    );
  }
  // return (
  //   <section className="bg-dark text-light p-5 text-center flex-column flex-grow-1 d-flex align-items-center justify-content-center">
  //     <h1>CONNECTING ...</h1>
  //   </section>
  // );
};
export default TwoFA;
