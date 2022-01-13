import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { api2fa } from "../../../conf/axios.conf_2fa";
import AuthContext from "../../../context";
import QRCode from "qrcode";
import { Formik } from "formik";

const QRCodeGenerate = (text: any) => {
  const [src, setSrc] = useState("");
  // console.log(text);

  useEffect(() => {
    QRCode.toDataURL(text).then(setSrc);
  }, []);

  return <img src={src} alt="" />;
};

const TwoFA = () => {
  const context = useContext(AuthContext);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [QR, setQR] = useState("");

  useEffect(() => {
    api2fa
      .post("/generate")
      .then((response: any) => {
        // console.log("res ::: ", response);

        // const base64ImageString = Buffer.from(response.data, "binary").toString(
        //   "base32"
        // );
        // setQR(base64ImageString);
        setQR(response.data);
      })
      .catch((err: any) => {
        setDown(true);
        setUp(false);
        console.log("Auth:", err);
      });
  }, [context]);

  const submit = (values: any, action: any) => {
    api2fa
      .post("/authenticate", values)
      .then((response: any) => {
        console.log("I WAS HERE !!!!", context);

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
        {/* <img src={`data:image/png;base64,${QR}`} alt="QR Code" /> */}
        <img src={QR} alt="QR Code" />
        <p> {QR}</p>
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
